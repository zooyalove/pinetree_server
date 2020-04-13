import { IMiddleware } from "koa-router";
import path from "path";
import fs from "fs";
import sharp from "sharp";
import { uploadDir } from "../../../lib/dir";
import { generateFilename } from "../../../lib/util";

const prefix = "thumb";

/**
 * 저장된 이미지 보기
 * GET /api/v1/file/:filename
 */
export const getImage: IMiddleware = ctx => {
  const filename: string = ctx.params.filename;

  const imagePath = path.resolve(uploadDir, filename);

  // console.log(imagePath);

  if (!fs.existsSync(imagePath)) {
    ctx.body = {
      name: "NOT_EXISTS",
    };
    ctx.status = 400;
  }

  const imageStream = fs.createReadStream(imagePath);

  ctx.type = filename.indexOf(".jpg") > -1 ? "image/jpeg" : "image/png";
  ctx.body = imageStream;
};

/**
 * 이미지 저장하기
 * POST /api/v1/file/
 */
export const uploadImage: IMiddleware = async ctx => {
  if (!ctx.request.files) {
    ctx.body = {
      name: "REQUIRED_FILE",
    };
    ctx.status = 400;
    return;
  }

  const originImage: string | undefined = ctx.request.body.origin_image;
  if (originImage) {
    fs.unlinkSync(path.join(uploadDir, originImage));
  }

  const imageFile = ctx.request.files.image;
  const imagePath = imageFile.path;

  try {
    const metadata = await sharp(imagePath).metadata();
    // console.log("Rotation : ", metadata.orientation);

    const signCode = generateFilename();
    const filename = `${signCode}.jpg`;
    const filePath = path.join(uploadDir, filename);

    const image = await sharp(imagePath).jpeg({ quality: 100 }).resize({ width: 500 });

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

    const thumb = await sharp(filePath).png().resize({ width: 100 });
    const thumb_filename = `${prefix}_${filename}`.replace(".jpg", ".png");

    await thumb.toFile(path.join(uploadDir, thumb_filename));

    fs.unlinkSync(imagePath);

    ctx.body = {
      image: filename,
      thumbnail: thumb_filename,
    };
  } catch (e) {
    console.log(e);
    ctx.throw(e, 400);
  }
};

/**
 * 저장된 이미지 삭제
 * DELETE /api/v1/file/
 * @param image
 */
export const deleteImage: IMiddleware = ctx => {
  const image: string | undefined = ctx.request.body.image;

  if (!image) {
    ctx.body = {
      name: "EMPTY_FILENAME",
    };
    ctx.status = 400;
    return;
  }

  const imagePath = path.join(uploadDir, image);

  if (!fs.existsSync(imagePath)) {
    ctx.body = {
      name: "NOT_EXISTS",
    };
    ctx.status = 400;
    return;
  }

  fs.unlinkSync(imagePath);
  ctx.body = {
    name: "DELETE_SUCCESS",
  };
};
