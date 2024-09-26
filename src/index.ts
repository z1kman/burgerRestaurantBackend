import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 8080;

app.get("/", (req: Request, res: Response) => {
  res.send("Started!");
});

app.get("/ping", (_req: Request, res: Response) => {
  res.send("pong 🏓");
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
