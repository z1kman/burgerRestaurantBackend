const getProduct = {
  tags: ["Product"],
  description: "Get one product",
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
              longDescription: {
                type: "string",
                example:
                  "The cheeseburger with two beef patties and melted cheese is a true flavor symphony! Juicy patties, fresh vegetables—crunchy lettuce, tomatoes, and pickles—and our secret sauce, all nestled in a soft bun. A true celebration for food lovers!",
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

export { getProduct };
