import { IMiddleware } from "koa-router";
import path from "path";
import fs from "fs";
import UploadImage from "../../../lib/uploadImage";
import { uploadDir } from "../../../lib/dir";
import sharp from "sharp";

/**
 * 저장된 이미지 보기
 * GET /api/v1/file/:filename
 */
export const getImage: IMiddleware = ctx => {
  const filename = ctx.params.filename;

  const imagePath = path.resolve(uploadDir, filename);

  if (!fs.existsSync(imagePath)) {
    ctx.body = {
      name: "NOT_EXISTS"
    };
    ctx.status = 400;
  }

  ctx.type = "image/jpeg";

  const imageStream = fs.createReadStream(imagePath);
  imageStream.pipe(ctx.body);
};

/**
 * 이미지 저장하기
 * POST /api/v1/file/
 */
export const uploadImage: IMiddleware = async ctx => {
  if (!ctx.request.files) {
    ctx.body = {
      name: "REQUIRED_FILE"
    };
    ctx.status = 400;
    return;
  }

  console.log(ctx.request.files);
  const imageFile = ctx.request.files.image;
  const imagePath = imageFile.path;
  console.log(imagePath);

  const metadata = await sharp(imagePath).metadata();
  console.log("Rotation : ", metadata.orientation);
  await sharp(imagePath)
    .resize({ width: 500, fit: "cover" })
    .toFile("500_cover_" + imageFile.name);
};

/**
 * 저장된 이미지 삭제
 * DELETE /api/v1/file/:filename
 */
export const deleteImage: IMiddleware = ctx => {};
