import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const CurrentUser = createParamDecorator(
  (data: never, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.currentUser;
  }
)