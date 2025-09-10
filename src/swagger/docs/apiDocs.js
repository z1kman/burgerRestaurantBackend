const { basketCalculate } = require("./basketCalculate.js");
const { basketOrder } = require("./basketOrder.js")
const { getNotifications } = require("./getNotifications.docs.js")
const { getProduct } = require("./getProduct.docs.js")
const { getProducts } = require("./getProducts.docs.js")
const { getUser } = require("./getUser.docs.js")
const { login } = require("./login.docs.js")

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
      name: "Notifications",
    },
    {
      name: "Basket",
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
    "/api/user/info": {
      get: getUser,
    },
    "/api/notifications": {
      get: getNotifications,
    },
    "/api/basket/calculate": {
      post: basketCalculate,
    },
    "/api/basket/order": {
      post: basketOrder,
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

module.exports = { apiDocumentation } 
