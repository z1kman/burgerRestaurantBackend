import { dbPool } from "../dd";

type Product = {
  id: number;
  product_type_id: number;
  price: number;
  image_url: string;
};

export const getAllProductsWithTranslations = async (
  lang: string
): Promise<Product[]> => {
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
    return result.rows;
  } catch (err) {
    console.error("Error fetching products with translations:", err);
    throw err;
  }
};
