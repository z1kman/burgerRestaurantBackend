import { getProduct } from "./getProduct.docs";
import { getProducts } from "./getProducts.docs";

const apiDocumentation = {
  openapi: "3.0.1",
  info: {
    version: "1.0",
    title: "API Documentation",
    description: "Api for working with burger restaurant application",
  },
  tags: [
    {
      name: "Products",
    },
    {
      name: "Product",
    },
  ],
  paths: {
    "/api/products": {
      get: getProducts,
    },
    "/api/product/:id": {
      get: getProduct,
    },
  },
  components: {
    securitySchemes: {},
    schemas: {},
  },
};

export { apiDocumentation };
