import { applyDecorators } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiPayloadTooLargeResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
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
  );
}
