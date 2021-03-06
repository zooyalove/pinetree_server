import nanoid from "nanoid";
import { ParameterizedContext } from "koa";
import createAuthMail from "./emailTemplate";
import sendMailFactory from "sendmail";
import crypto from "crypto";

export const MongoPrimary = {
  type: String,
  default: () => nanoid(10)
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

export const generateFilename = (): string => {
  const seed = crypto.randomBytes(20);
  const hash = crypto
    .createHash("sha1")
    .update(seed)
    .digest("hex");
  return hash;
};

type RegisterEmailParams = {
  to: string;
  verify_code: string;
};

export const sendAuthMail = ({ to, verify_code }: RegisterEmailParams): void => {
  const { subject, body } = createAuthMail(verify_code);

  const sendmail = sendMailFactory({});

  sendmail(
    {
      from: "dorry457@gmail.com",
      to,
      subject,
      html: body
    },
    () => {}
  );
};
