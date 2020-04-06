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
  const filename = ctx.params.filename;

  const imagePath = path.resolve(uploadDir, filename);

  console.log(imagePath);

  if (!fs.existsSync(imagePath)) {
    ctx.body = {
      name: "NOT_EXISTS"
    };
    ctx.status = 400;
  }

  const imageStream = fs.createReadStream(imagePath);

  ctx.type = "image/jpeg";
  ctx.body = imageStream;
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

  const originImage = ctx.request.body.origin_image;
  if (originImage) {
    fs.unlinkSync(path.join(uploadDir, originImage));
  }

  const imageFile = ctx.request.files.image;
  const imagePath = imageFile.path;

  try {
    const metadata = await sharp(imagePath).metadata();
    console.log("Rotation : ", metadata.orientation);

    const signCode = generateFilename();
    const filename = `${signCode}.jpg`;
    const filePath = path.join(uploadDir, filename);

    const image = await sharp(imagePath)
      .jpeg({ quality: 100 })
      .resize({ width: 500 });

    // image rotation
    if (metadata.orientation && metadata.orientation !== 1) {
      switch (metadata.orientation) {
        case 8: // 90 degree
          image.rotate(90);
          break;

        case 6: // -90 degree
          image.rotate(-90);
          break;

        case 3: // 180 degree
          image.rotate(180);
      }
    }

    const bufferImage = await image.toBuffer({ resolveWithObject: false });
    const thumb = sharp(bufferImage)
      .png()
      .resize({ width: 100 });
    const thumb_filename = `${prefix}_${filename}`.replace(".jpg", ".png");

    image.toFile(filePath);
    thumb.toFile(path.join(uploadDir, thumb_filename));

    fs.unlinkSync(imagePath);

    ctx.body = {
      image: filename,
      thumbnail: thumb_filename
    };
  } catch (e) {
    console.log(e);
    ctx.throw(e);
  }
};

/**
 * 저장된 이미지 삭제
 * DELETE /api/v1/file/:filename
 */
export const deleteImage: IMiddleware = ctx => {};
