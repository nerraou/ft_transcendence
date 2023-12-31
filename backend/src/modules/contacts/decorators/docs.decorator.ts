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
          message: "success",
          contactId: 1,
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
          message: "success",
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
      required: false,
    }),
    ApiQuery({
      name: "limit",
      type: "number",
      required: false,
    }),
    ApiOkResponse({
      description: "contacts list",
      schema: {
        example: {
          count: 1,
          contacts: [
            {
              id: 1,
              username: null,
              email: "jdoe@example.com",
              firstName: "string",
              lastName: null,
              avatarPath: "7e3b2ca3-cb75-4857-b0d4-66174f1b9a32.png",
              status: "ONLINE | OFFLINE | IN_GAME",
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
  );
}
