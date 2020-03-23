import { IMiddleware } from "koa-router";

export const modifyProfile: IMiddleware = ctx => {
  console.log(ctx.request.files);
  ctx.body = "success";
};
