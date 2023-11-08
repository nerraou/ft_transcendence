import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Patch,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { FileInterceptor } from "@nestjs/platform-express";
import { User as UserEntity } from "@prisma/client";
import { writeFile } from "fs/promises";

import { AppEnv } from "@config/env-configuration";
import { JwtAuthGuard } from "@modules/auth/guards/jwt-auth.guard";
import { HashService } from "@common/services/hash.service";

import {
  MeApiDocumentation,
  UpdateProfileApiDocumentation,
  UpdatePasswordApiDocumentation,
  UpdateAvatarApiDocumentation,
} from "./decorators/docs.decorator";
import { User } from "./decorators/user.decorators";
import { UpdateProfileDto } from "./dto/update-user.dto";
import { UsersService } from "./users.service";
import UsernameExistsPipe from "./pipes/username-exists.pipe";
import { UpdatePasswordDto } from "./dto/update-password.dto";
import { FileSizeValidationPipe } from "./pipes/file-size-validation.pipe";

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
  getProfile(@User() user: UserEntity) {
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
    };
  }

  @Patch("/profile")
  @UpdateProfileApiDocumentation()
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @User() user: UserEntity,
    @Body(UsernameExistsPipe) updateProfileDto: UpdateProfileDto,
  ) {
    await this.usersService.updateProfile(user.id, updateProfileDto);

    return {
      message: "success",
    };
  }

  @Patch("/password")
  @UpdatePasswordApiDocumentation()
  @UseGuards(JwtAuthGuard)
  async updateEmail(
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
    @UploadedFile(FileSizeValidationPipe) file: Express.Multer.File,
  ) {
    const avatarPath = `${this.configService.get("imagesPath")}/${
      user.avatarPath
    }`;

    await writeFile(avatarPath, file.buffer);

    return {
      message: "success",
    };
  }
}
