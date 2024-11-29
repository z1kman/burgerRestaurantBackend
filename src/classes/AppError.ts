import { ErrorName } from "../constants/errors";

export class AppError extends Error {
  public status: number;
  public name: ErrorName | string;
  public message: string;

  constructor({
    status,
    name,
    message,
  }: {
    status?: number;
    name?: ErrorName | string;
    message?: string;
  }) {
    super(`status= ${status}; name = ${name}; message = ${message};`);
    const errorBody = this.getErrorBody(name);
    this.status = errorBody.status;
    this.name = errorBody.name;
    this.message = errorBody.message;
  }

  getErrorBody(name?: ErrorName | string) {
    const baseBody = {
      status: 500,
      success: false,
      name,
      message: "Internal Server Error",
    };
    const errorName = name as ErrorName;

    if (
      [
        ErrorName.AUTH_FAILED,
        ErrorName.USER_NOT_FOUND,
        ErrorName.WRONG_PASSWORD,
      ].includes(name as ErrorName)
    ) {
      return { ...baseBody, status: 403, message: "Auth failed" };
    } else if ([ErrorName.NO_LANGUAGE_ATTRIBUTE].includes(errorName)) {
      return {
        ...baseBody,
        status: 400,
        message: "Missing required attribute: 'lang'",
      };
    } else if ([ErrorName.WRONG_LANGUAGE_ATTRIBUTE].includes(errorName)) {
      return {
        ...baseBody,
        status: 400,
        message: "Wrong attribute: 'lang'",
      };
    } else if ([ErrorName.NO_ID].includes(errorName)) {
      return { ...baseBody, statue: 400, message: "ID parameter required" };
    } else if ([ErrorName.NO_BODY].includes(errorName)) {
      return { ...baseBody, status: 400, message: "Body is required" };
    } else if ([ErrorName.INSUFFICIENT_FUNDS].includes(errorName)) {
      return {
        ...baseBody,
        status: 402,
        message: "Insufficient funds on the account",
      };
    } else {
      return { ...baseBody };
    }
  }
}
