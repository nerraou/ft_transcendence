import { applyDecorators } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

export function GetAchievementsApiDocumentation() {
  return applyDecorators(
    ApiTags("Achievements"),
    ApiBearerAuth(),
    ApiParam({
      name: "username",
      required: true,
    }),
    ApiOkResponse({
      description: "contacts list",
      schema: {
        example: [
          {
            id: 1,
            userId: 1,
            name: "FiveWins",
            createdAt: "2023-12-30T12:39:19.770Z",
            updatedAt: "2023-12-30T12:39:19.770Z",
          },
          {
            id: 2,
            userId: 1,
            name: "SecondRanked",
            createdAt: "2023-12-30T12:39:19.770Z",
            updatedAt: "2023-12-30T12:39:19.770Z",
          },
        ],
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
