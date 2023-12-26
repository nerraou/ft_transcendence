import {
  Body,
  ConflictException,
  Controller,
  ForbiddenException,
  Get,
  Param,
  ParseFilePipeBuilder,
  Patch,
  PayloadTooLargeException,
  Query,
  UnprocessableEntityException,
  UnsupportedMediaTypeException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { FileInterceptor } from "@nestjs/platform-express";
import { User as UserEntity } from "@prisma/client";
import { writeFile, unlink } from "fs/promises";
import { v4 as uuid4 } from "uuid";

import { AppEnv } from "@config/env-configuration";
import { JwtAuthGuard } from "@modules/auth/guards/jwt-auth.guard";
import { HashService } from "@common/services/hash.service";

import {
  MeApiDocumentation,
  UpdateProfileApiDocumentation,
  UpdateEmailApiDocumentation,
  UpdatePasswordApiDocumentation,
  UpdateAvatarApiDocumentation,
  GetLeaderboardApiDocumentation,
  GetUserByUsernameDocumentation,
} from "./decorators/docs.decorator";
import { User } from "./decorators/user.decorators";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { UsersService } from "./users.service";
import { UpdateEmailDto } from "./dto/update-email.dto";
import { UpdatePasswordDto } from "./dto/update-password.dto";
import { GetLeaderboardDto } from "./dto/get-leaderboard.dto";
import { ONE_MEGA } from "@common/constants";
import { ImageValidator } from "@common/ImageValidator";

const ImageValidatorPipe = new ParseFilePipeBuilder()
  .addMaxSizeValidator({
    maxSize: ONE_MEGA,
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

@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashService: HashService,
    private readonly configService: ConfigService<AppEnv>,
  ) {}

  @Get("/me")
  @MeApiDocumentation()
  @UseGuards(JwtAuthGuard)
  async getProfile(@User() user: UserEntity) {
    const ranking = await this.usersService.getUserRanking(user.id);

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      avatarPath: user.avatarPath,
      is2faEnabled: user.is2faEnabled,
      isEmailVerified: user.isEmailVerified,
      createdAt: user.createdAt,
      status: user.status,
      rating: user.rating,
      ranking,
    };
  }

  @Get("/:username")
  @GetUserByUsernameDocumentation()
  @UseGuards(JwtAuthGuard)
  async getUserByUsername(@Param("username") username: string) {
    const user = await this.usersService.findOneByUsername(username);

    if (!user) {
      throw new ForbiddenException();
    }

    const ranking = await this.usersService.getUserRanking(user.id);

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      avatarPath: user.avatarPath,
      createdAt: user.createdAt,
      status: user.status,
      rating: user.rating,
      ranking,
    };
  }

  @Get("/leaderboard")
  @GetLeaderboardApiDocumentation()
  @UseGuards(JwtAuthGuard)
  async getLeaderboard(@Query() getLeaderboardDto: GetLeaderboardDto) {
    const count = await this.usersService.usersCount();

    const players = await this.usersService.getLeaderboard(
      getLeaderboardDto.page,
      getLeaderboardDto.limit,
    );

    return {
      count,
      players,
    };
  }

  @Patch("/profile")
  @UpdateProfileApiDocumentation()
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @User("id") userId: number,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    if (updateProfileDto.username) {
      const user = await this.usersService.findOneByUsername(
        updateProfileDto.username,
      );

      if (user && user.id != userId) {
        throw new ConflictException();
      }
    }

    await this.usersService.updateProfile(userId, updateProfileDto);

    return {
      message: "success",
    };
  }

  @Patch("/email")
  @UpdateEmailApiDocumentation()
  @UseGuards(JwtAuthGuard)
  async updateEmail(
    @User() user: UserEntity,
    @Body() updateEmailDto: UpdateEmailDto,
  ) {
    const isPasswordsIdentical = await this.hashService.compare(
      updateEmailDto.password,
      user.password,
    );

    if (!isPasswordsIdentical) {
      throw new ForbiddenException();
    }

    const otherUser = await this.usersService.findOneByEmail(
      updateEmailDto.email,
    );

    if (otherUser && otherUser.id != user.id) {
      throw new ConflictException();
    }

    await this.usersService.updateEmail(user.id, updateEmailDto.email);

    return {
      message: "success",
    };
  }

  @Patch("/password")
  @UpdatePasswordApiDocumentation()
  @UseGuards(JwtAuthGuard)
  async updatePassword(
    @User() user: UserEntity,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const isPasswordsIdentical = await this.hashService.compare(
      updatePasswordDto.currentPassword,
      user.password,
    );

    if (!isPasswordsIdentical) {
      throw new ForbiddenException();
    }

    const newPassword = await this.hashService.hash(
      updatePasswordDto.newPassword,
    );

    await this.usersService.updatePassword(user.id, newPassword);

    return {
      message: "success",
    };
  }

  @Patch("/avatar")
  @UpdateAvatarApiDocumentation()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor("image"))
  async updateAvatar(
    @User() user: UserEntity,
    @UploadedFile(ImageValidatorPipe)
    file: Express.Multer.File,
  ) {
    const oldAvatarPath = `${this.configService.get("imagesPath")}/${
      user.avatarPath
    }`;

    const filename = uuid4() + ".png";
    const newAvatarPath = `${this.configService.get("imagesPath")}/${filename}`;

    await this.usersService.updateAvatarPath(user.id, filename);

    await writeFile(newAvatarPath, file.buffer);

    unlink(oldAvatarPath).catch((e) => {
      console.error("can't delete old avatar", e.message);
    });

    return {
      message: "success",
      avatarPath: filename,
    };
  }
}
