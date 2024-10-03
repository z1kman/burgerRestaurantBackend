import { getNotifications } from "./getNotifications.docs";
import { getProduct } from "./getProduct.docs";
import { getProducts } from "./getProducts.docs";
import { getUser } from "./getUser.docs";
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
      name: "User",
    },
    {
      name: "Notifications"
    }
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
    "/api/user/info": {
      get: getUser,
    },
    "/api/notifications": {
      get: getNotifications,
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        description: "Value: Bearer ",
      },
    },
  },
};

export { apiDocumentation };
