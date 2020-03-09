import Member from "db/Member";
import { Middleware } from "@koa/router";

export const signIn: Middleware = ctx => {};

export const signOut: Middleware = ctx => {};

// 회원가입 루틴
export const register: Middleware = ctx => {};

// 이메일로 부여된 코드 검증
// Method: POST
type RequestBody = {
  verify_code: string;
};

export const verifyCode: Middleware = ctx => {
  const { verify_code }: RequestBody = ctx.request.body;
};
