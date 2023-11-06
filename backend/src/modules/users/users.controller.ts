import { Body, Controller, Get, Patch, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "@modules/auth/guards/jwt-auth.guard";
import { User as UserEntity } from "@prisma/client";

import {
  MeApiDocumentation,
  UpdateProfileApiDocumentation,
} from "./decorators/docs.decorator";
import { User } from "./decorators/user.decorators";
import { UpdateProfileDto } from "./dto/update-user.dto";
import { UsersService } from "./users.service";
import UsernameExistsPipe from "./pipes/username-exists.pipe";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
}
