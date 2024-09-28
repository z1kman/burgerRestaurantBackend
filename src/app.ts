import express, { Request, Response } from "express";
import { productsRouter } from "./routes/products";
import { productRouter } from "./routes/product";

const app = express();

app.use("/api/products", productsRouter);
app.use("/api/product", productRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Started!");
});

export { app };
