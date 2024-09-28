import { Request, Response } from "express";
import { dbPool } from "../dd";
import { handleError } from "../middlewares/handleError";
import { ErrorName } from "../constants/errors";

export const getProducts = async (
  req: Request,
  res: Response
): Promise<any> => {
  const lang = req.query.lang as string;

  if (!lang) {
    handleError(res, { name: ErrorName.NO_LANGUAGE_ATTRIBUTE });
  }

  const query = `
      SELECT 
          p.id, 
          p.price, 
          p.image_url AS "imageUrl", 
          pt.name, 
          pt.short_description, 
          pt.long_description, 
          lg.name as language 
      FROM public.product p
      LEFT JOIN public.product_translations pt 
          ON p.id = pt.product_id
      LEFT JOIN public.language lg 
          ON pt.language_id = lg.id
      WHERE lg.name = $1
      `;

  try {
    const result = await dbPool.query(query, [lang]);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching products");
    handleError(res, { message: "Error fetching products" });
  }
};
