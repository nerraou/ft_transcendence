import { createParamDecorator, ExecutionContext } from "@nestjs/common";

import { FortyTwoAuthResponse as FortyTwoAuthResponseType } from "@modules/auth/strategies/forty-two.strategy";

export const FortyTwoAuthResponse = createParamDecorator(
  (
    fieldName: keyof FortyTwoAuthResponseType | undefined,
    ctx: ExecutionContext,
  ) => {
    const request = ctx.switchToHttp().getRequest();

    if (fieldName) {
      return request.user[fieldName];
    }

    return request.user;
  },
);
