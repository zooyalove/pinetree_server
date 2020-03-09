import Member from "db/Member";
import { IMiddleware } from "koa-router";

export const signIn: IMiddleware = ctx => {};

export const signOut: IMiddleware = ctx => {};

// 회원가입 루틴
export const register: IMiddleware = ctx => {};

// 이메일로 부여된 코드 검증
// Method: POST
type RequestBody = {
  verify_code: string;
};

export const verifyCode: IMiddleware = ctx => {
  const { verify_code }: RequestBody = ctx.request.body;
};
