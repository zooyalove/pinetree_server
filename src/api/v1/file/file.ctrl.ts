import { IMiddleware } from "koa-router";
import path from "path";
import fs from "fs";
import UploadImage from "../../../lib/uploadImage";
import { uploadDir } from "../../../lib/dir";

/**
 * 저장된 이미지 보기
 * GET /api/v1/file/:filename
 */
export const getImage: IMiddleware = ctx => {
  const filename = ctx.params.filename;

  if (!fs.existsSync(path.join(uploadDir, filename))) {
    ctx.body = {
      name: "NOT_EXISTS"
    };
    ctx.status = 400;
  }

  ctx.type = "image/";
};

/**
 * 이미지 저장하기
 * POST /api/v1/file/
 */
export const uploadImage: IMiddleware = ctx => {};

/**
 * 저장된 이미지 삭제
 * DELETE /api/v1/file/:filename
 */
export const deleteImage: IMiddleware = ctx => {};
