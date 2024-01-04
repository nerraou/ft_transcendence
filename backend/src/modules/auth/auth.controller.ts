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
} from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";
import { User as UserEntity } from "@prisma/client";
import { authenticator } from "otplib";

import { AppEnv } from "@config/env-configuration";
import { GoogleAuthResponse } from "@modules/users/decorators/google-user.decorators";
import { FortyTwoAuthResponse } from "@modules/users/decorators/forty-two-user.decorators";

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
} from "./decorators/docs.decorator";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { User } from "@modules/users/decorators/user.decorators";
import { VerifyTOTPDto } from "./dto/verify-totp.dto";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailService: MailerService,
    private readonly configService: ConfigService<AppEnv>,
  ) {}

  @Post("sign-in")
  @SignInApiDocumentation()
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  async signIn(@Request() req: Request & { user: UserEntity }) {
    return this.authService.signIn(req.user);
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
  googleAuthorize(@GoogleAuthResponse() response: GoogleAuthResponseType) {
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
    }

    return {
      accessToken: response.accessToken,
    };
  }

  @Get("/42/authorize")
  @UseGuards(FortyTwoAuthGuard)
  fortTwoAuthorize(@FortyTwoAuthResponse() response: FortyTwoAuthResponseType) {
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
    }

    return {
      accessToken: response.accessToken,
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
