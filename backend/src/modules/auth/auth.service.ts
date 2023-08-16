import { Injectable } from "@nestjs/common";
import { v4 as uuidV4 } from "uuid";
import { writeFile } from "fs/promises";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";

import { UsersService } from "@modules/users/users.service";
import { HashService } from "@common/services/hash.service";
import { AppEnv } from "@config/env-configuration";
import { ImageService } from "@common/services/image.service";
import { ConfigService } from "@nestjs/config";

import { SignUpDto } from "./dto/sign-up.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashService: HashService,
    private readonly imageService: ImageService,
    private readonly configService: ConfigService<AppEnv>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const hashedPassword = await this.hashService.hash(signUpDto.password);
    const avatarBuffer = this.imageService.generateAvatar({
      blocks: 6,
      width: 128,
    });
    const filename = `${uuidV4()}.png`;
    const avatarPath = `${this.configService.get("assetsPath")}/${filename}`;

    await writeFile(avatarPath, avatarBuffer);

    return this.usersService.create({
      email: signUpDto.email,
      password: hashedPassword,
      verifyEmailToken: uuidV4(),
      avatarPath: filename,
    });
  }

  confirmEmail(token: string) {
    return this.usersService.confirmEmail(token);
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user || user.password === null) {
      return null;
    }

    const isValidPassword = await this.hashService.compare(
      password,
      user.password,
    );

    if (isValidPassword) {
      return user;
    }

    return null;
  }

  async signIn(user: User) {
    const payload = { sub: user.id };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
