import { getProduct } from "./getProduct.docs";
import { getProducts } from "./getProducts.docs";
import { login } from "./login.docs";

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
    {
      name: "Login",
    },
  ],
  paths: {
    "/api/products": {
      get: getProducts,
    },
    "/api/product/{productID}": {
      get: getProduct,
    },
    "/api/user/login": {
      post: login,
    },
  },
  components: {
    securitySchemes: {},
    schemas: {},
  },
};

export { apiDocumentation };
