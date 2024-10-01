import { Response } from "express";
import { ErrorType } from "index";
import { ErrorName } from "../constants/errors";

export function handleError(res: Response, err: ErrorType) {
  const errorName = err.name;
  const baseBody = { success: false };

  if ([ErrorName.NO_LANGUAGE_ATTRIBUTE].includes(errorName)) {
    res
      .status(400)
      .send({ ...baseBody, message: "Missing required attribute: 'lang'" });
  } else if ([ErrorName.NO_ID].includes(errorName)) {
    res.status(400).send({ ...baseBody, message: "ID parameter required" });
  } else if (
    [ErrorName.USER_NOT_FOUND, ErrorName.WRONG_PASSWORD].includes(errorName)
  ) {
    res.status(400).send({ ...baseBody, message: "Auth failed" });
  } else {
    res.status(500).send({ ...baseBody, message: err.message });
  }
}
