import { Response } from "express";
import { ErrorType } from "index";
import { ErrorName } from "../constants/errors";

export function handleError(res: Response, err: ErrorType) {
  const errorName = err.name;

  if ([ErrorName.NO_LANGUAGE_ATTRIBUTE].includes(errorName)) {
    res.send(400).send({ message: "Missing required attribute: 'lang'" });
  } else {
    res.status(500).send({ message: err.message });
  }
}
