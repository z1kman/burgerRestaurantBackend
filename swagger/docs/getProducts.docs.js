const getProducts = {
  tags: ["Products"],
  description: "Get all the restaurant's products",
  summary: "Get all the restaurant's products",
  parameters: [
    {
      in: "query",
      name: "lang",
      required: false,
      description: "Response language (ru - Russian, en - English) ",
      schema: {
        type: "string",
        enum: ["ru", "en"],
      },
    },
  ],
  responses: {
    "200": {
      description: "All products successfully received ",
      content: {
        "application/json": {
          schema: {
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
                example: "Missing required attribute: 'lang'",
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
                example: "Error fetching products",
              },
            },
          },
        },
      },
    },
  },
};

module.exports = { getProducts } 
