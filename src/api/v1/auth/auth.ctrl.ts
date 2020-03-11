import Member from "db/Member";
import { IMiddleware } from "koa-router";
import DBNotify from "lib/dbNotify";
import { setCookieToken, generateToken } from "lib/util";

/** 로그인 루틴
 * POST /api/v1/auth/signin
 */
export const signIn: IMiddleware = async ctx => {
  let token: string | undefined = ctx.cookies.get("token");

  if (token) {
    ctx.body = {
      name: "ALREADY_SIGNIN"
    };
    ctx.status = 400;
    return;
  }

  type RequestBody = {
    email: string;
    password: string;
  };

  const { email, password }: RequestBody = ctx.request.body;

  const member = await Member.findOne({ email });

  if (!member) {
    ctx.body = {
      name: "NOT_EXISTS_USERINFO"
    };
    ctx.status = 400;
    return;
  }

  if (!member.validateHash(password)) {
    ctx.body = {
      name: "NOT_EQUAL_PASSWORD"
    };
    ctx.status = 400;
    return;
  }

  token = generateToken();

  setCookieToken(ctx, token);
};

/** 로그아웃 루틴
 * POST /api/v1/auth/signout
 */
export const signOut: IMiddleware = ctx => {};

/** 회원가입 루틴
 * POST /api/v1/auth/register
 */
export const register: IMiddleware = ctx => {};

/** 이메일로 부여된 코드 검증
 * POST /api/v1/auth/verify
 */
export const verifyCode: IMiddleware = ctx => {
  type RequestBody = {
    verify_code: string;
  };

  const { verify_code }: RequestBody = ctx.request.body;
};
