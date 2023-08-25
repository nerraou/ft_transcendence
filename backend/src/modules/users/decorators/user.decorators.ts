import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User as UserEntity } from "@prisma/client";

export const User = createParamDecorator(
  (fieldName: keyof UserEntity | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    if (fieldName) {
      return request.user[fieldName];
    }

    return request.user;
  },
);
