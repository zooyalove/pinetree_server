import { File } from "formidable";
import crypto from "crypto";

interface IUploadImageOptions {
  /**
   * {String} Sets the directory for placing file uploads in, default './upload'
   */
  destination?: string;

  /**
   * {String} Set the prefix name of filename,
   */
  prefix?: string;

  /**
   * {Boolean} Keep file name and extension
   */
  keepFilename?: boolean;
}

class UploadImage {
  constructor(file: File, options?: IUploadImageOptions) {}

  resize() {
    return this;
  }

  createThumbnail() {}

  save() {}
}

export default UploadImage;
