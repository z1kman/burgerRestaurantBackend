const getUser = {
  tags: ["User"],
  description: "Get information on the currently authorized user",
  summary: "Get user information",
  security: [{ bearerAuth: {} }],
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
                  type: "string",
                  example: "9505b...3ab",
                },
                username: {
                  type: "string",
                  example: "user1",
                },
                firstName: {
                  type: "string",
                  example: "Ivan",
                },
                lastName: {
                  type: "string",
                  example: "Ivanov",
                },
                points: {
                  type: "number",
                  example: 10000,
                },
              },
            },
          },
        },
      },
    },
    "403": {
      description: "Auth failed",
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

module.exports = { getUser } 