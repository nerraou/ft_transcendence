import { applyDecorators } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

export function ReadMessagesApiDocumentation() {
  return applyDecorators(
    ApiTags("Messages"),
    ApiBearerAuth(),
    ApiBody({
      description: "read messages",
      schema: {
        properties: {
          messagesIds: { type: "array" },
        },
        example: {
          messagesIds: [1, 2],
        },
      },
    }),
    ApiOkResponse({
      description: "Successful",
      schema: {
        example: {
          message: "success",
        },
      },
    }),
    ApiUnauthorizedResponse({
      description: "Unauthorized",
      schema: {
        example: {
          message: "Unauthorized",
          statusCode: 401,
        },
      },
    }),
    ApiForbiddenResponse({
      description: "Forbidden",
      schema: {
        example: {
          message: "Forbidden",
          statusCode: 403,
        },
      },
    }),
  );
}

export function GetDirectMessagesApiDocumentation() {
  return applyDecorators(
    ApiTags("Messages"),
    ApiBearerAuth(),
    ApiQuery({
      name: "page",
      type: "number",
    }),
    ApiQuery({
      name: "limit",
      type: "number",
    }),
    ApiOkResponse({
      description: "Successful",
      schema: {
        example: {
          count: 5,
          messages: [
            {
              id: 5,
              senderId: 2,
              receiverId: 1,
              isRead: false,
              text: "How about you, how it's going?",
              createdAt: "2023-12-25T11:20:43.991Z",
              updatedAt: "2023-12-25T11:20:43.991Z",
              sender: {
                id: 2,
                username: "noface",
                firstName: "Jean",
                lastName: "Doe",
                avatarPath: "2dbd75de-6a4d-4fd5-9b84-027a14e9f1d6.png",
              },
            },
            {
              id: 4,
              senderId: 2,
              receiverId: 1,
              isRead: false,
              text: "I am fine thank you",
              createdAt: "2023-12-25T11:20:27.837Z",
              updatedAt: "2023-12-25T11:20:27.837Z",
              sender: {
                id: 2,
                username: "noface",
                firstName: "Jean",
                lastName: "Doe",
                avatarPath: "2dbd75de-6a4d-4fd5-9b84-027a14e9f1d6.png",
              },
            },
          ],
        },
      },
    }),
    ApiUnauthorizedResponse({
      description: "Unauthorized",
      schema: {
        example: {
          message: "Unauthorized",
          statusCode: 401,
        },
      },
    }),
  );
}
