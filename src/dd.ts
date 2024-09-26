import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`;
const dbPool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME, // Замените на имя вашей базы данных
  password: process.env.DB_PASSWORD, // Замените на ваш пароль
  //   connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

export { dbPool };
