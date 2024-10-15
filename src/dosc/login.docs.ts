export const login = {
  tags: ["User"],
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            username: {
              type: "string",
              example: "user1",
            },
            password: {
              type: "string",
              example: "user",
            },
          },
          required: ["username", "password"],
        },
      },
    },
  },
  responses: {
    "200": {
      description: "successful operation",
      content: {
        "application/json": {
          schema: {
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
              token: {
                type: "string",
                example: "eyJ....9",
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
                example: "Auth failed'",
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
                example: "Error during login",
              },
            },
          },
        },
      },
    },
  },
};
