import { OptionalAuthRequest } from "../types";
import { handleError } from "../handlers/handleError";
import { Response } from "express";
import { ErrorName } from "../constants/errors";
import { getUserInfo } from "./auth";
import { getRawProductsData } from "./products";

type DataItem = { productId: number; quantity: number };

interface CalculateRequest extends OptionalAuthRequest {
  body: DataItem[];
}

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
