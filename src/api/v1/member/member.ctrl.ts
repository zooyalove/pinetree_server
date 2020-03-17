import { IMiddleware } from "koa-router";

export const modifyProfileImage: IMiddleware = ctx => {
  console.log(ctx.request.files);
  ctx.body = "success";
};
