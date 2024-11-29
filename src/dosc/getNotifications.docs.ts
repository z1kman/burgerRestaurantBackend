export const getNotifications = {
  tags: ["Notifications"],
  summary: "Get all notification for user",
  description: "Get all notification for user",
  security: [{ bearerAuth: {} as any }],
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
      description: "All notifications successfully received ",
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
                description: {
                  type: "string",
                  example: "Buy two burgers, get the third one for free!",
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
                example: "Error fetching notifications",
              },
            },
          },
        },
      },
    },
  },
};


