import { Router } from "express";
import { optionalAuthMiddleware } from "../middlewares/optionalAuthMiddleware";
import { calculate, order } from "../controllers/basket";

const basketRouter = Router();
basketRouter.post("/calculate", optionalAuthMiddleware, calculate);
basketRouter.post("/order", optionalAuthMiddleware, order);

export { basketRouter };