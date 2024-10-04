import dotenv from "dotenv";
dotenv.config();

export const config = {
  SECRET_AUTH_TOKEN: process.env.SECRET_AUTH_TOKEN,
};
