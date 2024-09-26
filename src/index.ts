import express, { Request, Response } from "express";
import { Client } from "pg";
import dotenv from "dotenv";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8080;

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`;
const client = new Client({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to PostgreSQL database");
    // Здесь можно выполнять запросы к базе данных
  } catch (err: unknown) {
    // Указываем тип ошибки
    if (err instanceof Error) {
      console.error("Connection error", err.stack);
    } else {
      console.error("Unknown error", err);
    }
  } finally {
    await client.end(); // Закрываем соединение
  }
}
connectToDatabase();

app.get("/", (req: Request, res: Response) => {
  res.send("Started!");
});

app.get("/ping", (_req: Request, res: Response) => {
  res.send("pong 🏓");
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
