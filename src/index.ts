import express, { Request, Response } from "express";
import { getAllProductsWithTranslations } from "./models/product";

const app = express();

const PORT = process.env.PORT || 8080;


app.get("/api/products", async (req: Request, res: Response) => {
  const lang = req.query.lang as string;

  if (!lang) {
    res.status(400).json({ error: "Language query parameter is required" });
  }

  try {
    const products = await getAllProductsWithTranslations(lang);
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
  return
});

app.get("/", (req: Request, res: Response) => {
  res.send("Started!");
});

app.get("/ping", (_req: Request, res: Response) => {
  res.send("pong 🏓");
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
