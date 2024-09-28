import swaggerJsDoc from "swagger-jsdoc";

const PORT =  process.env.PORT || 8080
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
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // или ['./src/routes/**/*.ts'] для вложенных папок
};

// Создание Swagger спецификации
export const swaggerDocs = swaggerJsDoc(swaggerOptions);

