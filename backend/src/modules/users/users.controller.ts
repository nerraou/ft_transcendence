import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Patch,
  UseGuards,
} from "@nestjs/common";
import { User as UserEntity } from "@prisma/client";

import { JwtAuthGuard } from "@modules/auth/guards/jwt-auth.guard";
import EmailExistsPipe from "@modules/auth/pipes/email-exists.pipe";

import { HashService } from "@common/services/hash.service";

import {
  MeApiDocumentation,
  UpdateProfileApiDocumentation,
  UpdateEmailApiDocumentation,
  UpdatePasswordApiDocumentation,
} from "./decorators/docs.decorator";
import { User } from "./decorators/user.decorators";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { UsersService } from "./users.service";
import UsernameExistsPipe from "./pipes/username-exists.pipe";
import { UpdateEmailDto } from "./dto/update-email.dto";
import { UpdatePasswordDto } from "./dto/update-password.dto";

@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashService: HashService,
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
    @User("id") userId: number,
    @Body(UsernameExistsPipe) updateProfileDto: UpdateProfileDto,
  ) {
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
    @Body(EmailExistsPipe) updateEmailDto: UpdateEmailDto,
  ) {
    const isPasswordsIdentical = await this.hashService.compare(
      updateEmailDto.password,
      user.password,
    );

    if (!isPasswordsIdentical) {
      throw new ForbiddenException();
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
}
