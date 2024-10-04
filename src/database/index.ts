import { config } from "../config";
import { PrismaClient } from '@prisma/client';

const { Sequelize } = require("sequelize");

export const sequelize = new Sequelize(
  config.DB_NAME,
  config.DB_USER,
  config.DB_PASSWORD,
  {
    host: config.DB_HOST,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: "false",
      },
    },
  }
);


export const prisma = new PrismaClient();