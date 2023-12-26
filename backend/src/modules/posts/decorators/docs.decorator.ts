import { applyDecorators } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiPayloadTooLargeResponse,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnsupportedMediaTypeResponse,
} from "@nestjs/swagger";

export function CreatePostApiDocumentation() {
  return applyDecorators(
    ApiTags("Posts"),
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
          content: {
            type: "string",
          },
        },
      },
    }),
    ApiOkResponse({
      description: "Successful",
      schema: {
        example: {
          id: 1,
          content: "this is a new post",
          imagePath: "5af89652-8ee1-4a10-9187-a2ecad40d374.png",
          createdAt: "2023-12-18T21:05:51.134Z",
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
    ApiUnsupportedMediaTypeResponse({
      description: "Unsupported Media Type",
      schema: {
        example: {
          message: "Unsupported Media Type",
          statusCode: 415,
        },
      },
    }),
  );
}

export function GetPostsApiDocumentation() {
  return applyDecorators(
    ApiTags("Posts"),
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
      description: "posts list",
      schema: {
        example: {
          posts: [
            {
              id: 8,
              content: "Hello",
              imagePath: "bfa5fe9c-289c-4f5b-af32-9284be29f9a8.png",
              userId: 1,
              likesCount: 5,
              createdAt: "2023-12-18T21:45:37.725Z",
              updatedAt: "2023-12-18T21:45:37.725Z",
            },
            {
              id: 7,
              content: "Hello",
              imagePath: null,
              userId: 1,
              likesCount: 1,
              createdAt: "2023-12-18T21:45:27.962Z",
              updatedAt: "2023-12-18T21:45:27.962Z",
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

export function LikePostApiDocumentation() {
  return applyDecorators(
    ApiTags("Posts"),
    ApiBearerAuth(),
    ApiParam({
      type: "string",
      name: "id",
    }),
    ApiCreatedResponse({
      description: "Created",
      schema: {
        example: {
          message: "success",
        },
      },
    }),
    ApiNotFoundResponse({
      description: "Not Found",
      schema: {
        example: {
          message: "Not Found",
          statusCode: 404,
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
