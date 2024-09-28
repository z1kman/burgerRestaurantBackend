import express, { Request, Response } from "express";
import { productsRouter } from "./routes/products";
import { productRouter } from "./routes/product";
import swaggerUi from "swagger-ui-express";
import { swaggerDocs } from "./swaggerConfig";
import { apiDocumentation } from "./dosc/apiDocs";

const app = express();

app.use("/api/products", productsRouter);
app.use("/api/product", productRouter);

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
swaggerUi.setup(apiDocumentation);

// app.get("/", (req: Request, res: Response) => {
//   res.send("Started!");
// });

export { app };
