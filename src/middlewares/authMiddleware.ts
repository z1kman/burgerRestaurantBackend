import { NextFunction, Response } from "express";
import { handleError } from "../handlers/handleError";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { AuthRequest, JwtPayload } from "../types";
import { ErrorName } from "../constants/errors";

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return handleError(res, { name: ErrorName.AUTH_FAILED });
    }
    const decodedData = jwt.verify(
      token,
      config.SECRET_AUTH_TOKEN
    ) as JwtPayload;
    req.user = decodedData;

    next();
  } catch (e) {
    console.log(e);
    return handleError(res, { name: ErrorName.AUTH_FAILED });
  }
};
