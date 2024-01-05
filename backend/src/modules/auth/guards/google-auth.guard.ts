import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class GoogleAuthGuard extends AuthGuard("google") {
  handleRequest<TUser = any>(err: any, user: any): TUser {
    if (err || !user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
