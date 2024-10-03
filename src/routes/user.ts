import { Router } from "express";
import { getUser, login } from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";

const authRouter = Router();

authRouter.get('/info', authMiddleware, getUser)
authRouter.post("/login", login);

export { authRouter };