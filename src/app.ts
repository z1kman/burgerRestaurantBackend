import express from "express";
import { productsRouter } from "./routes/products";
import { productRouter } from "./routes/product";
import { authRouter } from "./routes/user";
import { notificationsRouter } from "./routes/notifications";
import { basketRouter } from "./routes/basket";
import { errorHandler } from "./middlewares/errors";
import { langMiddleware } from "./middlewares/langMiddleware";

const app = express();
app.use(express.json());
app.use(langMiddleware);

app.use("/api/products", productsRouter);
app.use("/api/product", productRouter);
app.use("/api/notifications", notificationsRouter);
app.use("/api/basket", basketRouter);
app.use("/api/user", authRouter);

app.use(errorHandler);

export { app };
