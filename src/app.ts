import express, { Request, Response } from "express";
import { productsRouter } from "./routes/products";

const app = express();

app.use("/api/products", productsRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Started!");
});

export { app };
