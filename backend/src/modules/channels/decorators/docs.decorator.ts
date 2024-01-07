import { applyDecorators } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiConsumes,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiParam,
  ApiPayloadTooLargeResponse,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
  ApiUnsupportedMediaTypeResponse,
} from "@nestjs/swagger";
import { ChannelMemberRole, ChannelType } from "@prisma/client";

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
              connectedMemberRole: "ADMIN",
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

export function UpdateChannelMemberStateApiDocumentation() {
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
          memberId: {
            type: "number",
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
          message: ["channelId must be a number"],
          error: "Unprocessable Entity",
          statusCode: 422,
        },
      },
    }),
  );
}

export function MuteChannelMemberApiDocumentation() {
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
          memberId: {
            type: "number",
          },
          minutes: {
            type: "number",
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
          message: ["channelId must be a number"],
          error: "Unprocessable Entity",
          statusCode: 422,
        },
      },
    }),
  );
}

export function ChangeChannelMemberRoleApiDocumentation() {
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
          memberId: {
            type: "number",
          },
          role: {
            type: "string",
            example: Object.values(ChannelMemberRole).join("|"),
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
          message: ["channelId must be a number"],
          error: "Unprocessable Entity",
          statusCode: 422,
        },
      },
    }),
  );
}

export function GetChannelMembersApiDocumentation() {
  return applyDecorators(
    ApiTags("Channels"),
    ApiBearerAuth(),
    ApiOkResponse({
      description: "Successful",
      schema: {
        example: {
          members: [
            {
              id: 12,
              memberId: 3,
              channelId: 4,
              role: "MEMBER",
              state: null,
              mutedUntil: null,
              createdAt: "2023-12-26T22:03:41.251Z",
              updatedAt: "2023-12-26T22:03:41.251Z",
              member: {
                id: 5,
                username: "user3",
                firstName: null,
                lastName: null,
                avatarPath: "88ea7025-39bd-41bc-b838-793d2933145b.png",
                rating: 400,
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
          message: ["channelId must be a number"],
          error: "Unprocessable Entity",
          statusCode: 422,
        },
      },
    }),
  );
}

export function GetPublicChannelsApiDocumentation() {
  return applyDecorators(
    ApiTags("Channels"),
    ApiBearerAuth(),
    ApiQuery({
      name: "search_query",
      required: false,
    }),
    ApiOkResponse({
      description: "Successful",
      schema: {
        example: {
          channels: [
            {
              id: 4,
              name: "The Greating",
              description: "greeting channel",
              imagePath: "5df0bfee-8c73-4571-90cc-13bb9b68aa3d.png",
              membersCount: 2,
              type: "PUBLIC",
              password: null,
              creatorId: 1,
              createdAt: "2023-12-25T19:44:25.565Z",
              updatedAt: "2023-12-26T16:04:40.566Z",
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

export function LeaveChannelApiDocumentation() {
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

export function GetChannelApiDocumentation() {
  return applyDecorators(
    ApiTags("Channels"),
    ApiBearerAuth(),
    ApiParam({
      name: "id",
      type: "number",
    }),
    ApiOkResponse({
      description: "Successful",
      schema: {
        example: {
          id: 4,
          name: "The Greating",
          description: "greeting channel",
          imagePath: "5df0bfee-8c73-4571-90cc-13bb9b68aa3d.png",
          membersCount: 6,
          type: "PUBLIC",
          creatorId: 1,
          isOwner: false,
          createdAt: "2023-12-25T19:44:25.565Z",
          updatedAt: "2023-12-31T17:54:21.947Z",
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

export function InviteUserApiDocumentation() {
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
          username: {
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
    ApiConflictResponse({
      description: "Conflict",
      schema: {
        example: {
          message: "Conflict",
          statusCode: 409,
        },
      },
    }),
    ApiUnprocessableEntityResponse({
      description: "Unprocessable Entity",
      schema: {
        example: {
          message: ["channelId must be a number"],
          error: "Unprocessable Entity",
          statusCode: 422,
        },
      },
    }),
  );
}

export function AcceptChannelInvitationApiDocumentation() {
  return applyDecorators(
    ApiTags("Channels"),
    ApiBearerAuth(),
    ApiBody({
      schema: {
        type: "object",
        properties: {
          token: {
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
          message: ["token must be a valid jwt"],
          error: "Unprocessable Entity",
          statusCode: 422,
        },
      },
    }),
  );
}
