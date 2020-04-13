import { IMiddleware } from "koa-router";
import sharp from "sharp";
import path from "path";
import fs from "fs";
import Member from "../../../db/Member";
import { uploadDir } from "../../../lib/dir";
import { generateFilename } from "../../../lib/util";

export const modifyProfile: IMiddleware = async ctx => {
  type RequestBody = {
    id: string;
    email: string;
    password?: string;
    nickname?: string;
  };

  const { id, email, password, nickname }: RequestBody = ctx.request.body;

  const member = await Member.findOne({ email, _id: id });
  if (!member) {
    ctx.body = {
      name: "NOT_EXISTS_USERINFO",
    };
    ctx.status = 401;
    return;
  }

  if (password) member.password = password;
  if (nickname) member.nickname = nickname;

  const profileDirectory = path.join(uploadDir, "profile");
  if (!fs.existsSync(profileDirectory)) {
    fs.mkdirSync(profileDirectory);
  }

  let profileImage: string = "";

  if (ctx.request.files) {
    const imagePath = ctx.request.files.profile_image.path;

    try {
      const metadata = await sharp(imagePath).metadata();

      const signCode = generateFilename();
      const filename = `${signCode}.png`;
      const filePath = path.join(profileDirectory, filename);

      const image = await sharp(imagePath).png().resize(100, 100);

      // image rotation
      if (metadata.orientation && metadata.orientation !== 1) {
        switch (metadata.orientation) {
          case 8: // 90 degree
            image.rotate(-90);
            break;

          case 6: // -90 degree
            image.rotate(90);
            break;

          case 3: // 180 degree
            image.rotate(180);
        }
      }

      await image.toFile(filePath);

      fs.unlinkSync(imagePath);

      if (member.profile_image) {
        fs.unlinkSync(path.join(profileDirectory, member.profile_image));
      }

      profileImage = filename;
    } catch (e) {
      ctx.throw(e, 400);
    }
  }

  member.profile_image = profileImage;

  await member.save();

  ctx.body = {
    nickname: member.nickname,
    profile_image: member.profile_image,
  };
};
