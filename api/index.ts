import express, { Request, Response } from 'express';

const app = express();
const port = 4000;

app.get('/', (req: Request, res: Response) => {
  res.send('Started!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});