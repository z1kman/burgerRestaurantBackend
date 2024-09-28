import { Request, Response } from "express";
import { handleError } from "../handlers/handleError";
import { ErrorName } from "../constants/errors";
import { Product } from "../models/product";
import { ProductTranslation } from "../models/productTranslation";
import { Language } from "../models/language";
import { sequelize } from "../database";

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
      attributes: [
        "id",
        "price",
        ["image_url_small", "imageUrl"],
        [sequelize.col("ProductTranslations.name"), "name"],
        [
          sequelize.col("ProductTranslations.short_description"),
          "shortDescription",
        ],
        [sequelize.col("ProductTranslations.Language.name"), "language"],
      ],
      include: [
        {
          model: ProductTranslation,
          attributes: [],
          include: [
            {
              model: Language,
              required: true,
              attributes: [],
              where: { name: lang },
            },
          ],
        },
      ],
      raw: true,
    });

    res.json(products);
  } catch (err) {
    console.error("Error fetching products", err);
    handleError(res, { message: "Error fetching products" });
  }
};
