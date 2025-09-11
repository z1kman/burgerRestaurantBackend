
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swaggerConfig.js");
const { apiDocumentation } = require("./docs/apiDocs.js");

const SWAGGER_PORT = process.env.SWAGGER_PORT || 4001;

const app = express();
app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
swaggerUi.setup(apiDocumentation);



app.listen(SWAGGER_PORT, () => {
    console.log(`Server is listening on ${SWAGGER_PORT}`);
});
