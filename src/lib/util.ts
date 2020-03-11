import nanoid from "nanoid";
import { ParameterizedContext } from "koa";

export const MongoPrimary = {
  type: String,
  default: () => nanoid(10),
  unique: true,
  index: true
};

export const setCookieToken = (ctx: ParameterizedContext, token: string) => {
  ctx.cookies.set("token", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  });
};

export const generateToken = (): string => {
  const token = nanoid();
  return token;
};
