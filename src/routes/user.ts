import { Router } from "express";
import { getUser, login } from "../controllers/auth";
import { authMiddleware } from "../middlewares/authMiddleware";

const authRouter = Router();

authRouter.get('/info', authMiddleware, getUser)
authRouter.post("/login", login);

export { authRouter };