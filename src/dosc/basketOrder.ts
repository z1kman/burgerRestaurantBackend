export const basketOrder = {
  tags: ["Basket"],
  summary:
    "Makes an order of the basket. The route accepts both authorized and unauthorized requests",
  description:
    "Calculates the contents of basket based on the passed request body. makes an order of the selected cart. Can deduct points from the account if the order is made by an authorized user",
  security: [{ bearerAuth: {} }, {}],
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            paymentMethod: {
              type: "string",
              example: "cash",
            },

            basket: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  productId: {
                    type: "number",
                    example: 1,
                  },
                  quantity: {
                    type: "number",
                    example: 5,
                  },
                },
                required: ["productId", "quantity"],
              },
            },
          },
        },
      },
    },
  },
  responses: {
    "200 (1)": {
      description:
        "paymentMethod = points. Authorization required. The entire basket has been successfully ordered",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "bool",
                example: true,
              },
              points: {
                type: "number",
                example: 111,
              },
            },
          },
        },
      },
    },
    "200 (2)": {
      description:
        "paymentMethod = cash. The entire basket has been successfully ordered",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "bool",
                example: true,
              },
            },
          },
        },
      },
    },
    "400 ": {
      description: "Invalid request",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "bool",
                example: false,
              },
              message: {
                type: "string",
                example: "Body is required",
              },
            },
          },
        },
      },
    },
    "402 ": {
      description:
        "Insufficient funds on the account. The number of points is not enough for payment",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "bool",
                example: false,
              },
              message: {
                type: "string",
                example: "Insufficient funds on the account",
              },
            },
          },
        },
      },
    },
    "403 ": {
      description:
        "Auth failed. If payment method = points but user is not authorized",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "bool",
                example: false,
              },
              message: {
                type: "string",
                example: "Auth failed",
              },
            },
          },
        },
      },
    },
    "500 ": {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "bool",
                example: false,
              },
              message: {
                type: "string",
                example: "Error during order basket",
              },
            },
          },
        },
      },
    },
  },
};
