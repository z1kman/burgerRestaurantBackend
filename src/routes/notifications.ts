import { Router } from "express";
import { getNotifications } from "../controllers/notifications";
import { authMiddleware } from "../middlewares/authMiddleware";

const notificationsRouter = Router();
notificationsRouter.get("/", authMiddleware, getNotifications);

export { notificationsRouter };
