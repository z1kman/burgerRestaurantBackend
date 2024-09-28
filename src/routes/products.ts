import { Router } from "express";
import { getProducts} from "../controllers/products";

const productsRouter = Router();

productsRouter.get("/", getProducts);

export { productsRouter };
