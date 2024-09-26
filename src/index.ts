import express, { Request, Response } from 'express';

const app = express();
const port = 4000;

app.get('/', (req: Request, res: Response) => {
  res.send('Started!');
});

// Default
app.get("/api", (req: Request, res: Response) => {
  res.status(201).json({ message: "Welcome to Auth ts" });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});