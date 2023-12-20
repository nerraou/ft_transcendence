import { applyDecorators } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiConsumes,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiPayloadTooLargeResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

export function MeApiDocumentation() {
  return applyDecorators(
    ApiTags("Users"),
    ApiBearerAuth(),
    ApiOkResponse({
      description: "Successful",
      schema: {
        example: {
          id: 1,
          username: null,
          email: "jdoe@example.com",
          firstName: null,
          lastName: null,
          avatarPath: "7e3b2ca3-cb75-4857-b0d4-66174f1b9a32.png",
          is2faEnabled: false,
          isEmailVerified: true,
          status: "ONLINE | OFFLINE | IN_GAME",
          createdAt: 1692017290161,
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

export function UpdateProfileApiDocumentation() {
  return applyDecorators(
    ApiTags("Users"),
    ApiBearerAuth(),
    ApiBody({
      schema: {
        properties: {
          username: { type: "string" },
          firstName: { type: "string" },
          lastName: { type: "string" },
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
    ApiConflictResponse({
      description: "username conflict",
      schema: {
        example: {
          message: "Conflict",
          statusCode: 409,
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

export function UpdatePasswordApiDocumentation() {
  return applyDecorators(
    ApiTags("Users"),
    ApiBearerAuth(),
    ApiBody({
      schema: {
        properties: {
          currentPassword: { type: "string" },
          newPassword: { type: "string" },
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
    ApiForbiddenResponse({
      description: "Forbidden",
      schema: {
        example: {
          message: "Forbidden",
          statusCode: 403,
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

export function UpdateEmailApiDocumentation() {
  return applyDecorators(
    ApiTags("Users"),
    ApiBearerAuth(),
    ApiBody({
      schema: {
        properties: {
          email: { type: "string" },
          password: { type: "string" },
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
    ApiConflictResponse({
      description: "email conflict",
      schema: {
        example: {
          message: "Conflict",
          statusCode: 409,
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

export function UpdateAvatarApiDocumentation() {
  return applyDecorators(
    ApiTags("Users"),
    ApiBearerAuth(),
    ApiConsumes("multipart/form-data"),
    ApiBody({
      schema: {
        type: "object",
        properties: {
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
  );
}
