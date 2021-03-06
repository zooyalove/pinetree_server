import { Middleware } from "koa";

export const isAuth: Middleware = (ctx, next) => {
  if (!ctx.url.includes("/api/v1/auth")) {
    if (!ctx.state.user_id) {
      return ctx.throw(401, "Member signin required");
    }
  }

  return next();
};
