import { Request } from "express";
import { ErrorName } from "../constants/errors";

export type ErrorType = {
  name?: ErrorName;
  message?: string;
};

export interface JwtPayload {
  id: string;
  username: string;
}

export interface AuthRequest extends Request {
  user: JwtPayload;
}