import { Router } from "express";
import { optionalAuthMiddleware } from "../middlewares/optionalAuthMiddleware";
import { calculate } from "../controllers/basket";

const basketRouter = Router();
basketRouter.post("/calculate", optionalAuthMiddleware, calculate);

export { basketRouter };