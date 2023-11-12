import { Injectable } from "@nestjs/common";
import { v4 as uuidV4 } from "uuid";
import { writeFile } from "fs/promises";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { Profile as GoogleProfile } from "passport-google-oauth20";

import { UsersService } from "@modules/users/users.service";
import { HashService } from "@common/services/hash.service";
import { AppEnv } from "@config/env-configuration";
import { ImageService } from "@common/services/image.service";
import { ConfigService } from "@nestjs/config";

import { SignUpDto } from "./dto/sign-up.dto";
import { FortyTwoProfile } from "./strategies/forty-two.strategy";

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

    const filename = await this.generateAvatar();

    return this.usersService.create({
      email: signUpDto.email,
      password: hashedPassword,
      verifyEmailToken: uuidV4(),
      avatarPath: filename,
    });
  }

  async googleSignUp(profile: GoogleProfile) {
    const email = profile.emails[0].value;

    let dbUser = await this.usersService.findOneByEmail(email);
    let success = true;

    if (!dbUser) {
      const filename = await this.generateAvatar();

      dbUser = await this.usersService.createWithGoogle({
        googleAccountId: profile.id,
        email: email,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        avatarPath: filename,
      });
    } else {
      if (dbUser.isEmailVerified) {
        await this.usersService.updateGoogleAccountIdById(
          dbUser.id,
          profile.id,
        );
      }

      success = dbUser.isEmailVerified;
    }

    return {
      success: success,
      user: dbUser,
    };
  }

  async fortyTwoSignUp(profile: FortyTwoProfile) {
    const email = profile.emails[0].value;

    let dbUser = await this.usersService.findOneByEmail(email);
    let success = true;

    if (!dbUser) {
      const filename = await this.generateAvatar();

      dbUser = await this.usersService.createWithFortyTwo({
        fortyTwoAccountId: profile.id,
        email: email,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        avatarPath: filename,
      });
    } else {
      if (dbUser.isEmailVerified) {
        await this.usersService.updateFortyTwoAccountIdById(
          dbUser.id,
          profile.id,
        );
      }

      success = dbUser.isEmailVerified;
    }

    return {
      success: success,
      user: dbUser,
    };
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

  validateGoogleUser(googleId: string) {
    return this.usersService.findOneByGoogleId(googleId);
  }

  validateFortyTwoUser(fortyTwoId: string) {
    return this.usersService.findOneByFortyTwoId(fortyTwoId);
  }

  async signIn(user: User) {
    const payload = { sub: user.id };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  private async generateAvatar() {
    const avatarBuffer = this.imageService.generateAvatar({
      blocks: 6,
      width: 128,
    });
    const filename = `${uuidV4()}.png`;
    const avatarPath = `${this.configService.get("imagesPath")}/${filename}`;

    await writeFile(avatarPath, avatarBuffer);

    return filename;
  }
}
