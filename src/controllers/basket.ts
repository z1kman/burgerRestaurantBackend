import { OptionalAuthRequest } from "../types";
import { handleError } from "../handlers/handleError";
import { Response } from "express";
import { ErrorName } from "../constants/errors";
import { prisma } from "../database";
import { getUser, getUserInfo } from "./auth";
import { getRawProductsData } from "./products";

type DataItem = { productId: number; quantity: number };
interface Body {
  data: DataItem[];
}

interface CalculateRequest extends OptionalAuthRequest {
  body: Body;
}

export const calculate = async (req: CalculateRequest, res: Response) => {
  const lang = req.query.lang as string;

  if (!lang) {
    return handleError(res, { name: ErrorName.NO_LANGUAGE_ATTRIBUTE });
  }
  const { data } = req.body;

  if (!data && !Array.isArray(data)) {
    return handleError(res, { name: ErrorName.NO_DATA });
  }

  const dataMap = getDataMap(data);

  try {
    const products = await getRawProductsData({
      lang,
      ids: Array.from(dataMap.keys()),
    });
    const user = req?.user?.username
      ? await getUserInfo(req.user.username)
      : null;

    const flatProducts = [];
    let finalPrice = 0;
    for (const item of products) {
      const flatProduct = {
        id: item.id,
        price: Number(item.price),
        imageUrl: item.image_url_small,
        type: item.product_type.type,
        name: item.product_translation[0]?.name,
        shortDescription: item.product_translation[0]?.short_description,
        language: item.product_translation[0]?.language.name,
      };
      const quantity = dataMap.get(flatProduct.id) || 0;
      finalPrice += quantity * flatProduct.price;
      flatProducts.push(flatProduct);
    }

    res.json({
      finalPrice: parseFloat(finalPrice.toFixed(2)),
      points: user?.points ?? 0,
      products: flatProducts,
    });
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
