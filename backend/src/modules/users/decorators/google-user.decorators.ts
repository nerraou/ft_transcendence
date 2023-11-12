import { createParamDecorator, ExecutionContext } from "@nestjs/common";

import { GoogleAuthResponse as GoogleAuthResponseType } from "@modules/auth/strategies/google.strategy";

export const GoogleAuthResponse = createParamDecorator(
  (
    fieldName: keyof GoogleAuthResponseType | undefined,
    ctx: ExecutionContext,
  ) => {
    const request = ctx.switchToHttp().getRequest();

    if (fieldName) {
      return request.user[fieldName];
    }

    return request.user;
  },
);
