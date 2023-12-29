import { applyDecorators } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from "@nestjs/swagger";
import { SortFieldEnum, SortOrderEnum } from "../dto/get-games.dto";

export function GetGamesApiDocumentation() {
  return applyDecorators(
    ApiTags("Users"),
    ApiBearerAuth(),
    ApiParam({
      name: "username",
      type: "string",
    }),
    ApiQuery({
      name: "page",
      type: "number",
    }),
    ApiQuery({
      name: "limit",
      type: "number",
    }),
    ApiQuery({
      name: "search_query",
      type: "string",
      required: false,
    }),
    ApiQuery({
      name: "start_date",
      type: Date,
      required: false,
      example: new Date(),
    }),
    ApiQuery({
      name: "end_date",
      type: Date,
      required: false,
      example: new Date(),
    }),
    ApiQuery({
      name: "sort_field",
      enum: SortFieldEnum,
      required: false,
    }),
    ApiQuery({
      name: "sort_order",
      enum: SortOrderEnum,
      required: false,
    }),

    ApiOkResponse({
      description: "players list",
      schema: {
        example: {
          count: 6,
          games: [
            {
              id: 39,
              createdAt: "2023-12-23T19:08:41.539Z",
              duration: 5403,
              player: {
                id: 1,
                username: "oxidia",
                avatarPath: "6c1e910c-c34a-42e2-8473-b03c5c97ecc0.png",
                score: 3,
                oldRating: 300,
                newRating: 310,
                oldRanking: 2,
                newRanking: 1,
                isWinner: true,
              },
              opponent: {
                id: 2,
                username: "noface",
                avatarPath: "2dbd75de-6a4d-4fd5-9b84-027a14e9f1d6.png",
                score: 2,
                oldRating: 420,
                newRating: 410,
                oldRanking: 2,
                newRanking: 3,
                isWinner: false,
              },
            },
          ],
        },
      },
    }),
    ApiUnprocessableEntityResponse({
      description: "Unprocessable Entity",
      schema: {
        example: {
          message: ["endDate must be greater than startDate"],
          error: "Unprocessable Entity",
          statusCode: 422,
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
