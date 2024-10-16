import { OptionalAuthRequest } from "../types";
import { NextFunction, Response } from "express";
import { ErrorName } from "../constants/errors";
import { getUserInfo } from "./auth";
import { getRawProductsData } from "./products";
import { Prisma } from "@prisma/client";
import { prisma } from "../database";
import { AppError } from "../classes/AppError";

type DataItem = { productId: number; quantity: number };

interface CalculateRequest extends OptionalAuthRequest {
  body: DataItem[];
}
interface OrderRequest extends OptionalAuthRequest {
  paymentMethod: "points" | "cash";
  basket: DataItem[];
}

type ProductPayload = {
  id: number;
  product_type: {
    type: string;
  };
  product_translation: Array<{
    name: string;
    short_description: string;
    language: {
      name: string;
    };
  }>;
  price: Prisma.Decimal;
  image_url_small: string;
};

export const calculate = async (
  req: CalculateRequest,
  res: Response,
  next: NextFunction
) => {
  const lang = req.query.lang as string;

  if (!lang) {
    return next(new AppError({ name: ErrorName.NO_LANGUAGE_ATTRIBUTE }));
  }
  const body = req.body;

  if (!body && !Array.isArray(body)) {
    return next(new AppError({ name: ErrorName.NO_BODY }));
  }

  try {
    const dataMap = getDataMap(body);
    const products = await getRawProductsData({
      lang,
      ids: Array.from(dataMap.keys()),
    });
    const user = req?.user?.username
      ? await getUserInfo(req.user.username)
      : null;

    const normalizedData = getNormalizedData(products, dataMap);

    res.json({
      ...normalizedData,
      points: user?.points ?? 0,
    });
  } catch (err) {
    console.error("Error fetching basket", err);
    return next(new AppError({ message: "Error fetching basket" }));
  }
};

export const order = async (
  req: OrderRequest,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;

  if (!body || !Array.isArray(body.basket) || !body.paymentMethod) {
    return next(new AppError({ name: ErrorName.NO_BODY }));
  }

  try {
    const paymentMethod = body.paymentMethod;
    const dataMap = getDataMap(body.basket);
    const products = await getRawProductsData({
      ids: Array.from(dataMap.keys()),
    });
    const user = req?.user?.username
      ? await getUserInfo(req.user.username)
      : null;

    const normalizedData = getNormalizedData(products, dataMap);
    const finalPrice = normalizedData.finalPrice;
    const points = user?.points ?? 0;
    const newPointsValue = parseFloat((points - finalPrice).toFixed(2));

    if (paymentMethod === "cash") {
      res.status(200).json({
        success: true,
      });
      return;
    }

    if (!user && paymentMethod === "points") {
      return next(new AppError({ name: ErrorName.AUTH_FAILED }));
    }

    if (newPointsValue < 0) {
      return next(new AppError({ name: ErrorName.INSUFFICIENT_FUNDS }));
    }
    
    await prisma.wallet.update({
      where: {
        user_id: user.id,
      },
      data: {
        points: newPointsValue,
      },
    });

    res.json({
      success: true,
      points: newPointsValue,
    });
  } catch (err) {
    console.error("Error during order basket", err);
    return next(new AppError({ message: "Error during order basket" }));
  }
};

const getDataMap = (data: DataItem[]) => {
  if (!data) {
    return new Map();
  }
  const MIN_QUANTITY = 0;
  const MAX_QUANTITY = 200;
  return new Map(
    data.map((item) => [
      item.productId,
      Math.min(
        MAX_QUANTITY,
        Math.max(MIN_QUANTITY, item.quantity ?? MIN_QUANTITY)
      ),
    ])
  );
};

const getNormalizedData = (
  products: ProductPayload[],
  dataMap: Map<number, number>
) => {
  const flatProducts = [];
  let finalPrice = 0;
  for (const item of products) {
    const quantity = dataMap.get(item.id) || 0;
    const itemPrice = parseFloat((quantity * Number(item.price)).toFixed(2));
    const flatProduct = {
      id: item.id,
      price: Number(item.price),
      totalPrice: itemPrice,
      imageUrl: item.image_url_small,
      type: item.product_type.type,
      name: item.product_translation[0]?.name,
      shortDescription: item.product_translation[0]?.short_description,
      language: item.product_translation[0]?.language.name,
    };

    finalPrice += itemPrice;
    flatProducts.push(flatProduct);
  }

  return {
    finalPrice: parseFloat(finalPrice.toFixed(2)),
    products: flatProducts,
  };
};
