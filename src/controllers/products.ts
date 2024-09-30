import { Request, Response } from "express";
import { handleError } from "../handlers/handleError";
import { ErrorName } from "../constants/errors";
import { Product } from "../models/product";
import { ProductTranslation } from "../models/productTranslation";
import { Language } from "../models/language";
import { sequelize } from "../database";
import { ProductType } from "../models/productType";

export const getProducts = async (req: Request, res: Response) => {
  const lang = req.query.lang;
  const type = req.query.type;

  if (!lang) {
    handleError(res, { name: ErrorName.NO_LANGUAGE_ATTRIBUTE });
  }

  try {
    const products = await Product.findAll({
      attributes: [
        "id",
        "price",
        ["image_url_small", "imageUrl"],
        [sequelize.col("ProductType.type"), "type"],
        [sequelize.col("ProductTranslations.name"), "name"],
        [
          sequelize.col("ProductTranslations.short_description"),
          "shortDescription",
        ],
        [sequelize.col("ProductTranslations.Language.name"), "language"],
      ],
      include: [
        {
          model: ProductType,
          attributes: [],
          required: true,
          where: type
            ? {
                type,
              }
            : null,
        },
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
