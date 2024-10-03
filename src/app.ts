import express, { Request, Response } from "express";
import { productsRouter } from "./routes/products";
import { productRouter } from "./routes/product";
import swaggerUi from "swagger-ui-express";
import { swaggerDocs } from "./swaggerConfig";
import { apiDocumentation } from "./dosc/apiDocs";
import { authRouter } from "./routes/user";

const app = express();
app.use(express.json())

app.use("/api/products", productsRouter);
app.use("/api/product", productRouter);
app.use("/api/user", authRouter);

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
swaggerUi.setup(apiDocumentation);

export { app };
