import { Request, Response } from "express";
import { ErrorName } from "../constants/errors";
import { Product } from "../models/product";
import { ProductType } from "../models/productType";
import { ProductTranslation } from "../models/productTranslation";
import { Language } from "../models/language";
import { handleError } from "../handlers/handleError";
import { sequelize } from "../database";


export const getProduct = async (req: Request, res: Response) => {
  const lang = req.query.lang as string;
  const { id } = req.params;

  if (!lang) {
    handleError(res, { name: ErrorName.NO_LANGUAGE_ATTRIBUTE });
  }
  if (!id) {
    handleError(res, { name: ErrorName.NO_ID });
  }

  try {
    const products = await Product.findOne({
      attributes: [
        "id",
        "price",
        ["image_url_full", "imageUrl"],
        [sequelize.col("ProductType.type"), "type"],
        [sequelize.col("ProductTranslations.name"), "name"],
        [
          sequelize.col("ProductTranslations.long_description"),
          "longDescription",
        ],
        [sequelize.col("ProductTranslations.Language.name"), "language"],
      ],
      include: [
        {
          model: ProductType,
          attributes: [],
          required: true,
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
      where: { id },
      raw: true,
    });

    res.json(products || {});
  } catch (err) {
    console.error("Error fetching products", err);
    handleError(res, { message: "Error fetching products" });
  }
};
