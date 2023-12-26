import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseFilePipeBuilder,
  ParseIntPipe,
  PayloadTooLargeException,
  Post,
  Query,
  UnprocessableEntityException,
  UnsupportedMediaTypeException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { FileInterceptor } from "@nestjs/platform-express";
import { writeFile } from "fs/promises";
import { v4 as uuid4 } from "uuid";

import { AppEnv } from "@config/env-configuration";
import { JwtAuthGuard } from "@modules/auth/guards/jwt-auth.guard";
import { User } from "@modules/users/decorators/user.decorators";
import { TWO_MEGA } from "@common/constants";
import { ImageValidator } from "@common/ImageValidator";

import {
  CreatePostApiDocumentation,
  GetPostsApiDocumentation,
  LikePostApiDocumentation,
} from "./decorators/docs.decorator";
import { CreatePostDto } from "./dto/create-post.dto";
import { PostsService } from "./posts.service";
import { GetPostsDto } from "./dto/get-posts.dto";

const ImageValidatorPipe = new ParseFilePipeBuilder()
  .addMaxSizeValidator({
    maxSize: TWO_MEGA,
    message: "size",
  })
  .addValidator(new ImageValidator())
  .build({
    fileIsRequired: true,
    exceptionFactory(error) {
      if (error == "size") {
        return new PayloadTooLargeException();
      } else if (error == "type") {
        return new UnsupportedMediaTypeException();
      } else if (error == "File is required") {
        return new UnprocessableEntityException();
      }
    },
  });

@Controller("posts")
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly configService: ConfigService<AppEnv>,
  ) {}

  @Get("/")
  @GetPostsApiDocumentation()
  @UseGuards(JwtAuthGuard)
  async getPosts(@User("id") userId: number, @Query() query: GetPostsDto) {
    const posts = await this.postsService.getPosts(query.page, query.limit);

    return {
      posts: posts.map((post) => {
        const index = post.postLikes.findIndex((like) => {
          return like.userId == userId;
        });

        delete post.postLikes;

        return {
          ...post,
          likedByUser: index != -1,
        };
      }),
    };
  }

  @Post("/")
  @CreatePostApiDocumentation()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor("image"))
  async createPost(
    @User("id") userId: number,
    @Body() createPostDto: CreatePostDto,
    @UploadedFile(ImageValidatorPipe)
    file: Express.Multer.File | undefined,
  ) {
    let filename: string | undefined;

    if (!file && !createPostDto.content) {
      throw new UnprocessableEntityException({
        message: ["on of the following fields must be present(content, image)"],
        error: "Unprocessable Entity",
        statusCode: 422,
      });
    }

    if (file) {
      filename = uuid4() + ".png";
      const imagePath = `${this.configService.get("imagesPath")}/${filename}`;

      await writeFile(imagePath, file.buffer);
    }

    const post = await this.postsService.create(
      userId,
      createPostDto.content,
      filename,
    );

    return {
      id: post.id,
      content: post.content,
      imagePath: post.imagePath,
      createdAt: post.createdAt,
    };
  }

  @Post("/like/:id")
  @LikePostApiDocumentation()
  @UseGuards(JwtAuthGuard)
  async likePost(
    @User("id") userId: number,
    @Param("id", ParseIntPipe) postId: number,
  ) {
    const post = await this.postsService.getPostId(postId);

    if (!post) {
      throw new NotFoundException();
    }

    await this.postsService.toggleLike(postId, userId);

    return {
      message: "success",
    };
  }
}
