import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "@modules/auth/guards/jwt-auth.guard";
import { User } from "@prisma/client";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("/me")
  @UseGuards(JwtAuthGuard)
  profile(@Request() req: Request & { user: User }) {
    return {
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      avatarPath: req.user.avatarPath,
      is2faEnabled: req.user.is2faEnabled,
      isEmailVerified: req.user.isEmailVerified,
      createdAt: req.user.createdAt.getTime(),
    };
  }
}
