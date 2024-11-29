import type { NextFunction, Response } from "express";
import { AppError } from "../classes/AppError";
import { ErrorName } from "../constants/errors";
import { CustomRequest, LanguageParam } from "../types";

export const langMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const lang = req?.query?.lang || LanguageParam.en;

  if (!lang) {
    return next(new AppError({ name: ErrorName.NO_LANGUAGE_ATTRIBUTE }));
  }

  if (!Object.values(LanguageParam).includes(lang as LanguageParam)) {
    return next(new AppError({ name: ErrorName.WRONG_LANGUAGE_ATTRIBUTE }));
  }

  req.lang = lang as LanguageParam;

  return next();
};
