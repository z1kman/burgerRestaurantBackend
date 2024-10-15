import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { AuthRequest, JwtPayload } from "../types";
import { ErrorName } from "../constants/errors";
import { AppError } from "../classes/AppError";

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.method === "OPTIONS") {
   return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return next(new AppError({  name: ErrorName.AUTH_FAILED }))
    }
    const decodedData = jwt.verify(
      token,
      config.SECRET_AUTH_TOKEN
    ) as JwtPayload;
    req.user = decodedData;

    return next();
  } catch (e) {
    console.log(e);
    return next(new AppError({  name: ErrorName.AUTH_FAILED }))
  }
};
