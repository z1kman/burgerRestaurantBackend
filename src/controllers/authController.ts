import { Request, Response } from "express";
import { ErrorName } from "../constants/errors";
import { handleError } from "../handlers/handleError";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { AuthRequest } from "../types";
import { prisma } from "../database";

const getUserInfo = async (
  username: string,
  options?: { withPassword: boolean }
) => {
  const user = await prisma.user.findFirst({
    select: {
      id: true,
      username: true,
      firstName: true,
      lastName: true,
      password: true,
      wallet: {
        select: {
          points: true,
        },
      },
    },
    where: {
      username: username,
    },
  });
  const transformedData = {
    ...user,
    points: user.wallet.points.toNumber(),
  };
  delete transformedData.wallet;

  if (!options?.withPassword) {
    delete transformedData.password;
  }
  return transformedData;
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
