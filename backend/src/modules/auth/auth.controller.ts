import {
  Controller,
  Post,
  Body,
  HttpCode,
  NotFoundException,
  UseGuards,
  Request,
  Get,
  UnauthorizedException,
  HttpStatus,
  ForbiddenException,
} from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";
import { User as UserEntity } from "@prisma/client";
import { authenticator } from "otplib";
import { v4 as uuid4 } from "uuid";

import { AppEnv } from "@config/env-configuration";
import { GoogleAuthResponse } from "@modules/users/decorators/google-user.decorators";
import { FortyTwoAuthResponse } from "@modules/users/decorators/forty-two-user.decorators";
import { RedisService } from "@common/modules/redis/redis.service";

import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto/sign-up.dto";
import EmailExistsPipe from "./pipes/email-exists.pipe";
import ConfirmEmailTokenDto from "./dto/confirm-email-token.dto";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { GoogleAuthGuard } from "./guards/google-auth.guard";
import { FortyTwoAuthGuard } from "./guards/forty-two-auth.guard";
import { GoogleAuthResponse as GoogleAuthResponseType } from "./strategies/google.strategy";
import { FortyTwoAuthResponse as FortyTwoAuthResponseType } from "./strategies/forty-two.strategy";
import {
  ConfirmApiDocumentation,
  SignInApiDocumentation,
  SignUpApiDocumentation,
  GetTOTPSecretApiDocumentation,
  VerifyOTPApiDocumentation,
  DisableTFAApiDocumentation,
  VerifyTOTPApiDocumentation,
} from "./decorators/docs.decorator";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { User } from "@modules/users/decorators/user.decorators";
import { VerifyTOTPDto } from "./dto/verify-totp.dto";
import { VerifyTOTPOAuthDto } from "./dto/verify.totp.oauth.dto";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailService: MailerService,
    private readonly configService: ConfigService<AppEnv>,
    private readonly redisService: RedisService,
  ) {}

  @Post("sign-in")
  @SignInApiDocumentation()
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  async signIn(
    @Request() req: Request & { user: UserEntity },
    @Body() body: any,
  ) {
    const { user } = req;

    if (user.is2faEnabled) {
      const isValid = authenticator.verify({
        secret: user.tfaSecret,
        token: body.token,
      });

      if (!isValid) {
        return {
          is2faEnabled: user.is2faEnabled,
        };
      }
    }

    return this.authService.signIn(user);
  }

  @Post("sign-up")
  @SignUpApiDocumentation()
  async signUp(@Body(EmailExistsPipe) signUpDto: SignUpDto) {
    const { verifyEmailToken, email } = await this.authService.signUp(
      signUpDto,
    );

    const appHostName = this.configService.get("appHostName");

    const accountConfirmationLink = `${appHostName}/auth/confirm?email=${email}&token=${verifyEmailToken}`;

    this.mailService
      .sendMail({
        to: signUpDto.email,
        subject: "Confirm your account",
        template: "sign-up",
        context: {
          link: accountConfirmationLink,
        },
      })
      .catch((e) => console.error("sendMail error:", e));

    return {
      message: "success",
    };
  }

  @Get("/google/authorize")
  @UseGuards(GoogleAuthGuard)
  async googleAuthorize(
    @GoogleAuthResponse() response: GoogleAuthResponseType,
  ) {
    if (response.isNew) {
      this.mailService
        .sendMail({
          to: response.user.email,
          subject: "Welcome to PongBoy",
          template: "oauth-welcome",
          context: {
            firstName: response.user.firstName,
            lastName: response.user.lastName,
            provider: "Google",
          },
        })
        .catch((e) => console.error("sendMail error:", e));
    } else {
      if (response.user.is2faEnabled) {
        const redisKey = uuid4();

        await this.redisService.set(
          redisKey,
          JSON.stringify({
            secret: response.user.tfaSecret,
            accessToken: response.accessToken,
          }),
          {
            EX: 180, // 3 minutes
          },
        );

        return {
          key: redisKey,
          is2faEnabled: true,
        };
      }
    }

    return {
      accessToken: response.accessToken,
    };
  }

  @Get("/42/authorize")
  @UseGuards(FortyTwoAuthGuard)
  async fortTwoAuthorize(
    @FortyTwoAuthResponse() response: FortyTwoAuthResponseType,
  ) {
    if (response.isNew) {
      this.mailService
        .sendMail({
          to: response.user.email,
          subject: "Welcome to PongBoy",
          template: "oauth-welcome",
          context: {
            firstName: response.user.firstName,
            lastName: response.user.lastName,
            provider: "42",
          },
        })
        .catch((e) => console.error("sendMail error:", e));
    } else {
      if (response.user.is2faEnabled) {
        const redisKey = uuid4();

        await this.redisService.set(
          redisKey,
          JSON.stringify({
            secret: response.user.tfaSecret,
            accessToken: response.accessToken,
          }),
          {
            EX: 180, // 3 minutes
          },
        );

        return {
          key: redisKey,
          is2faEnabled: true,
        };
      }
    }

    return {
      accessToken: response.accessToken,
    };
  }

  @Post("/totp/oauth/verify")
  @VerifyTOTPApiDocumentation()
  async verifyTOTPOAuth(@Body() verifyTOTPOAuthDto: VerifyTOTPOAuthDto) {
    const { key, token } = verifyTOTPOAuthDto;

    const savedDataString = await this.redisService.get(key);

    if (!savedDataString) {
      throw new ForbiddenException();
    }

    const savedData = JSON.parse(savedDataString);

    const isValid = authenticator.verify({
      secret: savedData.secret,
      token: token,
    });

    if (!isValid) {
      return {
        is2faEnabled: true,
      };
    }

    return {
      accessToken: savedData.accessToken,
    };
  }

  @Post("confirm")
  @ConfirmApiDocumentation()
  @HttpCode(200)
  async confirmEmail(@Body() confirmEmailTokenDto: ConfirmEmailTokenDto) {
    try {
      await this.authService.confirmEmail(
        confirmEmailTokenDto.email,
        confirmEmailTokenDto.token,
      );
      return {
        message: "success",
      };
    } catch (error) {
      /**
       * code 'P2025': means that the record to update not found
       */
      if (error.code == "P2025") {
        throw new NotFoundException();
      }

      throw error;
    }
  }

  @Get("/totp/secret")
  @GetTOTPSecretApiDocumentation()
  @UseGuards(JwtAuthGuard)
  genetateTOTPSecret(@User() user: UserEntity) {
    const secret = authenticator.generateSecret(32);

    const accountName = user.username || user.email;
    const service = "PongBoy";

    const keyuri = authenticator.keyuri(accountName, service, secret);

    return {
      secret,
      keyuri,
    };
  }

  @Post("/totp/verify")
  @VerifyOTPApiDocumentation()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async verifyTOTPSecret(
    @User() user: UserEntity,
    @Body() verifyTOTPDto: VerifyTOTPDto,
  ) {
    const isValid = authenticator.verify({
      token: verifyTOTPDto.token,
      secret: verifyTOTPDto.secret,
    });

    if (!isValid) {
      throw new UnauthorizedException();
    }

    await this.authService.enable2FA(user.id, verifyTOTPDto.secret);

    return {
      message: "success",
    };
  }

  @Post("/tfa/disable")
  @DisableTFAApiDocumentation()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async disable2FA(@User() user: UserEntity) {
    await this.authService.disable2FA(user.id);

    return {
      message: "success",
    };
  }
}
