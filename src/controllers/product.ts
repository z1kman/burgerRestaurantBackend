import { NextFunction, Response } from "express";
import { prisma } from "../database";
import { AppError } from "../classes/AppError";
import { CustomRequest } from "../types";

export const getProduct = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const lang = req.lang;
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: {
        id: Number(id),
        product_translation: {
          some: {
            language: {
              name: lang,
            },
          },
        },
      },
      select: {
        id: true,
        price: true,
        image_url_full: true,
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
            long_description: true,
            language: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    const flatProduct = {
      id: product?.id,
      price: product?.price.toNumber(),
      imageUrl: product?.image_url_full,
      type: product?.product_type?.type,
      name: product?.product_translation[0]?.name,
      longDescription: product?.product_translation[0]?.long_description,
      language: product?.product_translation[0]?.language.name,
    };
    res.json(flatProduct);
  } catch (err) {
    console.error("Error fetching product", err);
    return next(new AppError({ message: "Error fetching product" }));
  }
};
