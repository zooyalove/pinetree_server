import Member from "db/Member";
import { IMiddleware } from "koa-router";
import DBNotify from "lib/dbNotify";

export const signIn: IMiddleware = ctx => {
  DBNotify.publish("signin", "안뇽~~~~~~!");
  // ctx.status = 200;
  // ctx.body = "하이~~";
};

export const signOut: IMiddleware = ctx => {};

// 회원가입 루틴
export const register: IMiddleware = ctx => {};

// 이메일로 부여된 코드 검증
// Method: POST
export const verifyCode: IMiddleware = ctx => {
  type RequestBody = {
    verify_code: string;
  };

  const { verify_code }: RequestBody = ctx.request.body;
};
