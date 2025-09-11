import { app } from "./app";

const API_PORT = process.env.API_PORT ?? 4000;


app.listen(API_PORT, () => {
  console.log(`Server is listening oaaaan ${API_PORT}`);
});
