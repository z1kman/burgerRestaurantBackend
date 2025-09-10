const swaggerJsDoc = require("swagger-jsdoc");

const API_PORT = process.env.API_PORT || 4001

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation",
    },
    servers: [
      {
        url: `http://localhost:${API_PORT}`,
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

module.exports = swaggerJsDoc(swaggerOptions);
