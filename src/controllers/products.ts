import { NextFunction, Request, Response } from "express";
import { ErrorName } from "../constants/errors";
import { prisma } from "../database";
import { AppError } from "../classes/AppError";

type GetProductsData = {
  lang?: string;
  type?: string;
  ids?: number[];
};

export const getRawProductsData = async ({
  lang = "en",
  type,
  ids,
}: GetProductsData) => {
  const products = await prisma.product.findMany({
    where: {
      product_type: { type: type ? type : undefined },
      id: ids
        ? {
            in: ids,
          }
        : undefined,
    },
    select: {
      id: true,
      price: true,
      image_url_small: true,
      product_type: {
        select: {
          type: true,
        },
      },
      product_translation: {
        where: {
          language: {
            name: lang,
          },
        },
        select: {
          name: true,
          short_description: true,
          language: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return products;
};

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  const lang = req.query.lang as string;
  const type = req.query.type as string;

  if (!lang) {
    return next(new AppError({ name: ErrorName.NO_LANGUAGE_ATTRIBUTE }));
  }

  try {
    const products = await getRawProductsData({ lang, type });
    const flatProducts = products.map((product) => ({
      id: product.id,
      price: Number(product.price),
      imageUrl: product.image_url_small,
      type: product.product_type.type,
      name: product.product_translation[0]?.name,
      shortDescription: product.product_translation[0]?.short_description,
      language: product.product_translation[0]?.language.name,
    }));

    res.json(flatProducts);
  } catch (err) {
    console.error("Error fetching products", err);
    return next(new AppError({ message: "Error fetching products" }));
  }
};
