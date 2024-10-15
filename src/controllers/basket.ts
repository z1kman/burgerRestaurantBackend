import { OptionalAuthRequest } from "../types";
import { handleError } from "../handlers/handleError";
import { Response } from "express";
import { ErrorName } from "../constants/errors";
import { getUserInfo } from "./auth";
import { getRawProductsData } from "./products";
import { Prisma } from "@prisma/client";
import { prisma } from "../database";

type DataItem = { productId: number; quantity: number };

interface CalculateRequest extends OptionalAuthRequest {
  body: DataItem[];
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

export const calculate = async (req: CalculateRequest, res: Response) => {
  const lang = req.query.lang as string;

  if (!lang) {
    return handleError(res, { name: ErrorName.NO_LANGUAGE_ATTRIBUTE });
  }
  const body = req.body;

  if (!body && !Array.isArray(body)) {
    return handleError(res, { name: ErrorName.NO_BODY });
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
    handleError(res, { message: "Error fetching basket" });
  }
};

export const order = async (req: CalculateRequest, res: Response) => {
  const body = req.body;

  if (!body && !Array.isArray(body)) {
    return handleError(res, { name: ErrorName.NO_BODY });
  }

  try {
    const dataMap = getDataMap(body);
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

    if (!user) {
      res.status(200).json({
        success: true,
      });
      return;
    }

    if (newPointsValue < 0) {
      res.status(402).json({
        message: "Insufficient funds on the account",
        success: false,
      });
    } else {
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
    }
  } catch (err) {
    console.error("Error fetching basket", err);
    handleError(res, { message: "Error fetching basket" });
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
