import { ConflictException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { User as UserEntity } from "@prisma/client";
import { PassportStrategy } from "@nestjs/passport";
// @ts-ignore
import { Strategy } from "passport-42";

import { AppEnv, FortyTwoEnv } from "@config/env-configuration";

import { AuthService } from "../auth.service";

export interface FortyTwoAuthResponse {
  isNew: boolean;
  user: UserEntity;
  accessToken: string;
}

export interface FortyTwoProfile {
  id: string;
  username: string;
  displayName: string;
  name: {
    familyName: string;
    givenName: string;
  };
  emails: [
    {
      value: string;
    },
  ];
}

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    readonly configService: ConfigService<AppEnv>,
  ) {
    const fortyTwo = configService.get<FortyTwoEnv>("fortyTwo");

    super({
      clientID: fortyTwo.clientId,
      clientSecret: fortyTwo.clientSecret,
      callbackURL: fortyTwo.callbackUrl,
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string | undefined,
    profile: FortyTwoProfile,
  ): Promise<FortyTwoAuthResponse> {
    let dbUser = await this.authService.validateFortyTwoUser(profile.id);
    let isNewUser = false;

    if (!dbUser) {
      const { success, user } = await this.authService.fortyTwoSignUp(profile);
      dbUser = user;

      if (!success) {
        throw new ConflictException();
      }

      isNewUser = true;
    }

    const { accessToken } = await this.authService.signIn(dbUser);

    return {
      isNew: isNewUser,
      user: dbUser,
      accessToken,
    };
  }
}
