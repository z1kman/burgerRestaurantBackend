const getProduct = {
  tags: ["Products"],
  description: "Get one product",
  summary: "Get complete product information",
  parameters: [
    {
      in: "path",
      name: "productID",
      required: true,
      description: "ID of the product to be recieved",
      schema: {
        type: "string",
      },
    },
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
      description: "successful operation",
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
                type: "number",
                example: 2.55,
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

export { getProduct };
