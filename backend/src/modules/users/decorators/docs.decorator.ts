import { applyDecorators } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOkResponse,
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
