
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swaggerConfig.js");
const { apiDocumentation } = require("./docs/apiDocs.js");

const PORT = process.env.PORT || 4002;

const app = express();
app.use(express.json());

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
swaggerUi.setup(apiDocumentation);



app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});
