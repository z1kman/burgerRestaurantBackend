export const basketCalculate = {
  tags: ["Basket"],
  summary:
    "Calculate the contents of basket. The route accepts both authorized and unauthorized requests",
  description:
    "Calculates the contents of basket based on the passed request body. Authorization is required to load the user's points data",
  security: [{ bearerAuth: {} }, {}],
  parameters: [
    {
      in: "query",
      name: "lang",
      required: true,
      description: "Response language (ru - Russian, en - English) ",
      schema: {
        type: "string",
        enum: ["ru", "en"],
      },
    },
  ],
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
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
  responses: {
    "200": {
      description: "The entire basket has been successfully calculated",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              finalPrice: {
                type: "number",
                example: 12.75,
              },
              points: {
                type: "number",
                example: 0,
              },
              products: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: {
                      type: "number",
                      example: 1,
                    },
                    price: {
                      type: "number",
                      example: 2.55,
                    },
                    totalPrice: {
                      type: "number",
                      example: 12.75,
                    },
                    name: {
                      type: "string",
                      example: "Сheeseburger",
                    },
                    shortDescription: {
                      type: "string",
                      example: "Beef with cheddar",
                    },
                    imageUrl: {
                      type: "string",
                      example:
                        "https://res.cloudinary.com/dyvvorqvv/image/upload/double_cheeseburger_240_bq1rcv.png",
                    },
                    language: {
                      type: "string",
                      example: "en",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "400": {
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
                example: "`Missing required attribute: 'lang'",
              },
            },
          },
        },
      },
    },
    "500": {
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
                example: "Error fetching basket",
              },
            },
          },
        },
      },
    },
  },
};
