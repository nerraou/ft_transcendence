import { applyDecorators } from "@nestjs/common";
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from "@nestjs/swagger";

export function SignInApiDocumentation() {
  return applyDecorators(
    ApiTags("Authentication"),
    ApiBody({
      description: "sign in",
      type: "object",
      schema: {
        example: {
          email: "jdoe@example.com",
          password: "some-password",
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
    ApiUnauthorizedResponse({
      description: "bad cridentials",
      schema: {
        example: {
          message: "Unauthorized",
          statusCode: 401,
        },
      },
    }),
  );
}

export function SignUpApiDocumentation() {
  return applyDecorators(
    ApiTags("Authentication"),
    ApiBody({
      description: "sign un",
      type: "object",
      schema: {
        example: {
          email: "jdoe@example.com",
          password: "some-password",
        },
      },
    }),
    ApiCreatedResponse({
      description: "Successful sign up response",
      schema: {
        example: {
          message: "success",
        },
      },
    }),
    ApiUnprocessableEntityResponse({
      description: "Invalid data",
      schema: {
        example: {
          message: ["email must be an email", "password is not strong enough"],
          error: "Unprocessable Entity",
          statusCode: 400,
        },
      },
    }),
  );
}

export function ConfirmApiDocumentation() {
  return applyDecorators(
    ApiTags("Authentication"),
    ApiBody({
      description: "sign un",
      type: "object",
      schema: {
        example: {
          token: "126401d9-cd58-42a1-894f-94ac1fd7255e",
        },
      },
    }),
    ApiOkResponse({
      description: "Successful email confirm response",
      schema: {
        example: {
          message: "success",
        },
      },
    }),
    ApiNotFoundResponse({
      description: "Token not found",
      schema: {
        example: {
          message: "Not Found",
          statusCode: 404,
        },
      },
    }),
    ApiUnprocessableEntityResponse({
      description: "Invalid data",
      schema: {
        example: {
          message: ["token must be a UUID"],
          error: "Unprocessable Entity",
          statusCode: 422,
        },
      },
    }),
  );
}
