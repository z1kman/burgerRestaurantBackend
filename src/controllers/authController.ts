import { Request, Response } from "express";
import { ErrorName } from "../constants/errors";
import { handleError } from "../handlers/handleError";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { User } from "../models/user";

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      attributes: [
        "id",
        "username",
        ["first_name", "firstName"],
        ["last_name", "lastName"],
        "password",
      ],
      where: { username: username },
      raw: true,
    });
    if (!user) {
      return handleError(res, { name: ErrorName.USER_NOT_FOUND });
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return handleError(res, { name: ErrorName.WRONG_PASSWORD });
    }
    const token = jwt.sign(
      { id: user.id, username: user.username },
      config.SECRET_AUTH_TOKEN,
      { expiresIn: "24h" }
    );
    delete user.password;
    res.json({ ...user, token });
  } catch (err) {
    console.error(err);
    handleError(res, { message: "Error during login" });
  }
};
