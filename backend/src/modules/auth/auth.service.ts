import { Injectable } from "@nestjs/common";
import { v4 as uuidV4 } from "uuid";
import { writeFile } from "fs/promises";

import { UsersService } from "@modules/users/users.service";
import { HashService } from "@common/services/hash.service";

import { SignUpDto } from "./dto/sign-up.dto";
import { ImageService } from "@common/services/image.service";
import { ConfigService } from "@nestjs/config";
import { AppEnv } from "@config/env-configuration";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashService: HashService,
    private readonly imageService: ImageService,
    private readonly configService: ConfigService<AppEnv>,
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
}
