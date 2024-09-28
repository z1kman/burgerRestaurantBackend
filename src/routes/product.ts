import { Router } from "express";
import { getProduct } from "../controllers/product";

const productRouter = Router();

productRouter.get("/:id", getProduct);

export { productRouter };
