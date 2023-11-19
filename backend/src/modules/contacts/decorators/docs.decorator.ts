import { applyDecorators } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from "@nestjs/swagger";

export function CreateContactApiDocumentation() {
  return applyDecorators(
    ApiTags("Contacts"),
    ApiBearerAuth(),
    ApiBody({
      description: "create contact",
      schema: {
        properties: {
          userId: { type: "number" },
        },
      },
    }),
    ApiOkResponse({
      description: "Successful sign in response",
      schema: {
        example: {
          accessToken: "eyJhbGci...vijhqOQ",
        },
      },
    }),
    ApiUnprocessableEntityResponse({
      description: "Invalid data",
      schema: {
        example: {
          message: [
            "userId must be a positive number",
            "userId must be an integer number",
          ],
          error: "Unprocessable Entity",
          statusCode: 422,
        },
      },
    }),
    ApiForbiddenResponse({
      description: "forbidden",
      schema: {
        example: {
          message: "Forbidden",
          statusCode: 403,
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
  );
}

export function AcceptContactApiDocumentation() {
  return applyDecorators(
    ApiTags("Contacts"),
    ApiBearerAuth(),
    ApiParam({
      name: "id",
      type: "number",
    }),
    ApiOkResponse({
      description: "Successful sign in response",
      schema: {
        example: {
          accessToken: "eyJhbGci...vijhqOQ",
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

export function GetContactsApiDocumentation() {
  return applyDecorators(
    ApiTags("Contacts"),
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
      description: "contacts list",
      schema: {
        example: {},
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
  );
}
