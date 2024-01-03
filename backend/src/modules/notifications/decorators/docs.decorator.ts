import { applyDecorators } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from "@nestjs/swagger";

export function GetNotificationsApiDocumentation() {
  return applyDecorators(
    ApiTags("Notifications"),
    ApiQuery({
      name: "page",
      type: "number",
      required: false,
    }),
    ApiQuery({
      name: "limit",
      type: "number",
      required: false,
    }),
    ApiBearerAuth(),
    ApiOkResponse({
      description: "Successful",
      schema: {
        example: {
          count: 40,
          notifications: [
            {
              id: 1,
              userId: 2,
              metadata: {
                id: 1,
                type: "contact",
                status: "PENDING",
              },
              isRead: false,
              createdAt: "2023-09-10T16:54:17.990Z",
              updatedAt: "2023-09-10T16:54:17.990Z",
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
    ApiUnprocessableEntityResponse({
      description: "Unprocessable Entity",
      schema: {
        example: {
          message: [
            "page must not be less than 1",
            "page must be an integer number",
          ],
          error: "Unprocessable Entity",
          statusCode: 422,
        },
      },
    }),
  );
}

export function MarkNotificationsAsReadyApiDocumentation() {
  return applyDecorators(
    ApiTags("Notifications"),
    ApiBearerAuth(),
    ApiBody({
      type: "object",
      schema: {
        properties: {
          ids: {
            type: "array",
            example: [1, 2],
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
    ApiUnprocessableEntityResponse({
      description: "Unprocessable Entity",
      schema: {
        example: {
          message: [
            "each value in ids must be a positive number",
            "each value in ids must be an integer number",
            "ids must be an array",
          ],
          error: "Unprocessable Entity",
          statusCode: 422,
        },
      },
    }),
  );
}
