import { Request, Response } from "express";
import { ErrorName } from "../constants/errors";
import { handleError } from "../handlers/handleError";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { User } from "../models/user";
import { AuthRequest } from "../types";
import { Wallet } from "../models/wallet";
import { sequelize } from "../database";

const getUserInfo = async (
  username: string,
  options?: { withPassword: boolean }
): Promise<User> => {
  const user = await User.findOne({
    attributes: [
      "id",
      "username",
      ["first_name", "firstName"],
      ["last_name", "lastName"],
      "password",
      [sequelize.col("Wallet.points"), "points"],
    ],
    include: [
      {
        attributes: [],
        model: Wallet,
        required: false,
      },
    ],

    where: { username: username },
    raw: true,
  });

  if (!options?.withPassword) {
    delete user.password;
  }
  return user;
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await getUserInfo(username, { withPassword: true });
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

export const getUser = async (req: AuthRequest, res: Response) => {
  try {
    const { user } = req;
    const userData = await getUserInfo(user.username);

    if (!userData) {
      return handleError(res, { name: ErrorName.USER_NOT_FOUND });
    }

    res.json(userData);
  } catch (e) {
    console.error(e);
  }
};
