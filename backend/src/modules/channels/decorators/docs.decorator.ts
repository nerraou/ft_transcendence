import { applyDecorators } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiPayloadTooLargeResponse,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
  ApiUnsupportedMediaTypeResponse,
} from "@nestjs/swagger";
import { ChannelType } from "@prisma/client";

export function CreateChannelApiDocumentation() {
  return applyDecorators(
    ApiTags("Channels"),
    ApiBearerAuth(),
    ApiConsumes("multipart/form-data"),
    ApiBody({
      schema: {
        type: "object",
        properties: {
          name: {
            type: "string",
          },
          description: {
            type: "string",
          },
          type: {
            enum: Object.values(ChannelType),
          },
          password: {
            type: "string",
          },
          image: {
            type: "string",
            format: "binary",
          },
        },
      },
    }),
    ApiOkResponse({
      description: "Successful",
      schema: {
        example: {
          id: 1,
        },
      },
    }),
    ApiPayloadTooLargeResponse({
      description: "Payload Too Large",
      schema: {
        example: {
          message: "Payload Too Large",
          statusCode: 413,
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
    ApiUnprocessableEntityResponse({
      description: "Unprocessable Entity",
      schema: {
        example: {
          message: [
            "type must be one of the following values: PUBLIC, PRIVATE, PROTECTED",
          ],
          error: "Unprocessable Entity",
          statusCode: 422,
        },
      },
    }),
    ApiUnsupportedMediaTypeResponse({
      description: "Unsupported Media Type",
      schema: {
        example: {
          message: "Unsupported Media Type",
          statusCode: 415,
        },
      },
    }),
  );
}

export function UpdateChannelApiDocumentation() {
  return applyDecorators(
    ApiTags("Channels"),
    ApiBearerAuth(),
    ApiConsumes("multipart/form-data"),
    ApiBody({
      schema: {
        type: "object",
        properties: {
          name: {
            type: "string",
          },
          description: {
            type: "string",
          },
          type: {
            enum: Object.values(ChannelType),
          },
          password: {
            type: "string",
          },
          image: {
            type: "string",
            format: "binary",
          },
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
    ApiPayloadTooLargeResponse({
      description: "Payload Too Large",
      schema: {
        example: {
          message: "Payload Too Large",
          statusCode: 413,
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
    ApiUnprocessableEntityResponse({
      description: "Unprocessable Entity",
      schema: {
        example: {
          message: [
            "type must be one of the following values: PUBLIC, PRIVATE, PROTECTED",
          ],
          error: "Unprocessable Entity",
          statusCode: 422,
        },
      },
    }),
    ApiUnsupportedMediaTypeResponse({
      description: "Unsupported Media Type",
      schema: {
        example: {
          message: "Unsupported Media Type",
          statusCode: 415,
        },
      },
    }),
  );
}

export function GetChannelsApiDocumentation() {
  return applyDecorators(
    ApiTags("Channels"),
    ApiBearerAuth(),
    ApiOkResponse({
      description: "Successful",
      schema: {
        example: {
          channels: [
            {
              id: 4,
              name: "Hi",
              description: "greeting channel",
              imagePath: "80188ab1-b599-4c9b-b452-aeafda41b995.png",
              type: "PUBLIC",
              membersCount: 1,
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

export function JoinChannelApiDocumentation() {
  return applyDecorators(
    ApiTags("Channels"),
    ApiBearerAuth(),
    ApiBody({
      schema: {
        type: "object",
        properties: {
          channelId: {
            type: "number",
          },
          password: {
            type: "string",
          },
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
    ApiUnprocessableEntityResponse({
      description: "Unprocessable Entity",
      schema: {
        example: {
          message: [""],
          error: "Unprocessable Entity",
          statusCode: 422,
        },
      },
    }),
  );
}

export function GetChannelsMessagesApiDocumentation() {
  return applyDecorators(
    ApiTags("Channels"),
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
      description: "players list",
      schema: {
        example: {
          count: 10,
          messages: [
            {
              id: 9,
              message: "Nice :)",
              senderId: 1,
              channelId: 4,
              createdAt: "2023-12-27T19:36:50.026Z",
              updatedAt: "2023-12-27T19:36:50.026Z",
              sender: {
                id: 1,
                state: "KICKED | BANNED | null",
                mutedUntil: null,
                createdAt: "2023-12-25T19:44:25.565Z",
                member: {
                  id: 1,
                  avatarPath: "6c1e910c-c34a-42e2-8473-b03c5c97ecc0.png",
                  username: "oxidia",
                  rating: 340,
                },
              },
            },
            {
              id: 10,
              message: "Thanks!",
              senderId: 2,
              channelId: 4,
              createdAt: "2023-12-27T19:36:56.455Z",
              updatedAt: "2023-12-27T19:36:56.455Z",
              sender: {
                id: 2,
                state: "KICKED | BANNED | null",
                mutedUntil: "2023-12-27T20:03:33.303Z",
                createdAt: "2023-12-25T21:23:48.484Z",
                member: {
                  id: 2,
                  avatarPath: "3467405e-f1b6-49a8-bf6c-03a38a82ad44.png",
                  username: "noface",
                  rating: 380,
                },
              },
            },
          ],
        },
      },
    }),
    ApiUnauthorizedResponse({
      description: "bad jwt",
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
