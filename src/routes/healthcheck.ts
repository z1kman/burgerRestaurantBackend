import { Router } from "express";
import { getHealtcheck } from "../controllers/healthcheck";

const healthcheckRouter = Router();

healthcheckRouter.get("/", getHealtcheck);

export { healthcheckRouter };
