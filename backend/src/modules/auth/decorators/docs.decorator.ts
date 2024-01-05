import { applyDecorators } from "@nestjs/common";
import {
  ApiBearerAuth,
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
      schema: {
        properties: {
          email: { type: "string" },
          password: { type: "string" },
        },
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
      description: "sign up",
      schema: {
        properties: {
          email: { type: "string" },
          password: { type: "string" },
        },
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
          statusCode: 422,
        },
      },
    }),
  );
}

export function ConfirmApiDocumentation() {
  return applyDecorators(
    ApiTags("Authentication"),
    ApiBody({
      description: "Confirm email",
      schema: {
        properties: {
          email: { type: "string" },
          token: { type: "string" },
        },
        example: {
          emai: "jdoe@email.com",
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

export function GetTOTPSecretApiDocumentation() {
  return applyDecorators(
    ApiTags("Authentication"),
    ApiBearerAuth(),
    ApiOkResponse({
      description: "success",
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
  );
}

export function VerifyOTPApiDocumentation() {
  return applyDecorators(
    ApiTags("Authentication"),
    ApiBearerAuth(),
    ApiBody({
      description: "verify totp",
      schema: {
        properties: {
          secret: { type: "string" },
          token: { type: "string" },
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
      description: "bad jwt",
      schema: {
        example: {
          message: "Unauthorized",
          statusCode: 401,
        },
      },
    }),
    ApiUnprocessableEntityResponse({
      description: "Invalid data",
      schema: {
        example: {
          message: ["token must be a string"],
          error: "Unprocessable Entity",
          statusCode: 422,
        },
      },
    }),
  );
}

export function DisableTFAApiDocumentation() {
  return applyDecorators(
    ApiTags("Authentication"),
    ApiBearerAuth(),
    ApiOkResponse({
      description: "Successful",
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
  );
}

export function VerifyTOTPApiDocumentation() {
  return applyDecorators(
    ApiTags("Authentication"),
    ApiBearerAuth(),
    ApiBody({
      schema: {
        properties: {
          key: {
            type: "string",
          },
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
  );
}
