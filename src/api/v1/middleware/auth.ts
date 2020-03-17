import { IMiddleware } from "koa-router";

export const isAuth: IMiddleware = (ctx, next) => {
  console.log(ctx.state);
  if (!ctx.state.user_id) {
    return ctx.throw(401, "Member signin required");
  }

  return next();
};
