const getProducts = {
  tags: ["Products"],
  description: "Get all the restaurant's products",
  responses: {
    "200": {
      description: "All products successfully received ",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              id: {
                type: "number",
                example: 1,
              },
              price: {
                type: "string",
                example: "2.55",
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
    "500": {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Internal Server Error",
              },
            },
          },
        },
      },
    },
  },
};

export { getProducts };