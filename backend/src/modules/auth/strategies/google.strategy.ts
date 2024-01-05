import { ConflictException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { User as UserEntity } from "@prisma/client";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, Profile } from "passport-google-oauth20";

import { AppEnv, GoogleEnv } from "@config/env-configuration";

import { AuthService } from "../auth.service";

export interface GoogleAuthResponse {
  isNew: boolean;
  user: UserEntity;
  accessToken: string;
}

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    readonly configService: ConfigService<AppEnv>,
  ) {
    const googleEnv = configService.get<GoogleEnv>("google");

    super({
      clientID: googleEnv.clientId,
      clientSecret: googleEnv.clientSecret,
      callbackURL: googleEnv.callbackUrl,
      scope: ["profile", "email"],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string | undefined,
    profile: Profile,
  ): Promise<GoogleAuthResponse> {
    let dbUser = await this.authService.validateGoogleUser(profile.id);
    let isNewUser = false;

    if (!dbUser) {
      const { success, user } = await this.authService.googleSignUp(profile);
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
