import { Request, Response } from "express";
import { handleError } from "../handlers/handleError";
import { ErrorName } from "../constants/errors";
import { Product } from "../models/product";
import { ProductTranslation } from "../models/productTranslation";
import { Language } from "../models/language";

export const getProducts = async (
  req: Request,
  res: Response
): Promise<any> => {
  const lang = req.query.lang as string;

  if (!lang) {
    handleError(res, { name: ErrorName.NO_LANGUAGE_ATTRIBUTE });
  }

  try {
    const products = await Product.findAll({
      attributes: ["id", "price", ["image_url", "imageUrl"]],
      include: [
        {
          model: ProductTranslation,
          attributes: ["name", "short_description", "long_description"],
          include: [
            {
              model: Language,
              attributes: ["name"],
              where: { name: lang },
            },
          ],
        },
      ],
    });

    res.json(products);
  } catch (err) {
    console.error("Error fetching products", err);
    handleError(res, { message: "Error fetching products" });
  }
};
