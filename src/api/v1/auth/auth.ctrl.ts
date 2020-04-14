import Member from "../../../db/Member";
import { IMiddleware } from "koa-router";
import DBNotify from "../../../lib/dbNotify";
import { setCookieToken, generateToken, sendAuthMail } from "../../../lib/util";
import nanoid from "nanoid";

/** 로그인 루틴
 * POST /api/v1/auth/signin
 */
export const signIn: IMiddleware = async ctx => {
  let token: string | undefined = ctx.cookies.get("token");

  if (token || ctx.state.user_id) {
    ctx.body = {
      name: "ALREADY_SIGNIN",
    };
    ctx.status = 400;
    return;
  }

  type RequestBody = {
    email: string;
    password: string;
  };

  const { email, password }: RequestBody = ctx.request.body;

  if (!email || !password) {
    ctx.body = {
      name: "INVALID_REQUEST",
    };
    ctx.status = 400;
    return;
  }

  const member = await Member.findOne({ email });

  if (!member) {
    ctx.body = {
      name: "NOT_EXISTS_USERINFO",
    };
    ctx.status = 401;
    return;
  }

  if (!member.validateHash(password)) {
    ctx.body = {
      name: "NOT_EQUAL_PASSWORD",
    };
    ctx.status = 401;
    return;
  }

  token = generateToken();

  setCookieToken(ctx, token);
  ctx.state.user_id = member.id;

  ctx.body = {
    nickname: member.nickname,
    verified: member.verified,
    profile_image: member.profile_image,
    is_admin: member.is_admin,
  };
};

/** 로그아웃 루틴
 * POST /api/v1/auth/signout
 */
export const signOut: IMiddleware = ctx => {
  ctx.state.user_id = null;
  ctx.cookies.set("token", "");
  ctx.body = {
    name: "LOGOUT_SUCCESS",
  };
};

/** 회원가입 루틴
 * POST /api/v1/auth/register
 */
export const register: IMiddleware = async ctx => {
  type RequestBody = {
    email: string;
    password: string;
    nickname: string | null;
  };

  const { email, password, nickname } = ctx.request.body as RequestBody;

  // 동일한 이메일 정보가 존재하는지 체크
  const exists = await Member.findOne({ email });
  if (exists) {
    ctx.body = {
      name: "ALREADY_EXISTS",
    };
    ctx.status = 400;
    return;
  }

  const verify_code = nanoid(36);

  const member = new Member({
    email,
    password,
    nickname,
    verify_code,
  });

  await member.save();

  sendAuthMail({ to: email, verify_code });

  ctx.status = 201;
  ctx.body = {
    email,
    nickname,
  };
};

/** 이메일로 부여된 코드 검증
 * POST /api/v1/auth/verify
 */
export const verifyCode: IMiddleware = async ctx => {
  type RequestBody = {
    email: string;
    verify_code: string;
  };

  const { email, verify_code }: RequestBody = ctx.request.body;

  const member = await Member.findOne({
    email,
    verify_code,
  });

  if (!member) {
    ctx.body = {
      name: "NOT_EXISTS_USERINFO",
    };
    ctx.status = 401;
    return;
  }

  if (member.verified) {
    ctx.body = {
      name: "ALREADY_VERIFIED",
    };
    ctx.status = 400;
    return;
  }

  member.verified = true;
  await member.save();

  ctx.body = {
    name: "SUCCESS",
  };
  ctx.status = 200;
};
