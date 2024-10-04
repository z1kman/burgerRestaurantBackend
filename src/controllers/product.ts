import { Request, Response } from "express";
import { ErrorName } from "../constants/errors";
import { handleError } from "../handlers/handleError";
import { prisma } from "../database";


export const getProduct = async (req: Request, res: Response) => {
  const lang = req.query.lang as string;
  const { id } = req.params;

  if (!lang) {
    handleError(res, { name: ErrorName.NO_LANGUAGE_ATTRIBUTE });
  }

  try {
    const product = await prisma.product.findUnique({
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
      where: {
        id: Number(id),
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
    handleError(res, { message: "Error fetching product" });
  }
};
