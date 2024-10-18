import { app } from "./app";
import fs from "fs";
import https from "https";
const path = require('path');

const PORT = process.env.PORT || 4000;

const options = {
  key: fs.readFileSync(path.join(__dirname, '../certs/myserver.key')),
  cert:  fs.readFileSync(path.join(__dirname, '../certs/myserver.crt'))
};

https.createServer(options, app).listen(PORT, () => {
  console.log(`Server is running on port=${PORT}`);
});

