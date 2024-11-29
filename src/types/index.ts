import { Request } from "express";
import { ErrorName } from "../constants/errors";

export enum LanguageParam {
  en = "en",
  ru = "ru",
}

export type ErrorType = {
  name?: ErrorName;
  message?: string;
};

export interface JwtPayload {
  id: string;
  username: string;
}

export interface CustomRequest extends Request {
  lang: LanguageParam;
}

export interface AuthRequest extends CustomRequest {
  user: JwtPayload;
}

export interface OptionalAuthRequest extends CustomRequest {
  user?: JwtPayload;
}
