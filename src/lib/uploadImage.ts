import { File } from "formidable";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import sharp from "sharp";

interface IUploadImageOptions {
  /**
   * {String} Sets the directory for placing file uploads in, default './upload'
   */
  destination?: string;

  /**
   * {String} Set the prefix name of filename, default ''
   */
  prefix?: string;

  /**
   * {Boolean} Keep file name and extension, if false, sha1 hash signed filename will generate, default true
   */
  keepFilename?: boolean;

  /**
   * {Number} Max image size, default 500 pixel
   */
  maxImageSize?: number;
}

interface ISize {
  width: number;
  height: number;
}

type Size = number | ISize | null | undefined;

class UploadImage {
  private _options: IUploadImageOptions;
  private _originFile: File;
  private _filename: string;
  private _resource: sharp.Sharp;

  constructor(file: File, options?: IUploadImageOptions) {
    if (!file) {
      throw new Error("Required parameter is missing, file!");
      return;
    }

    if (!/^image(gif|jp(e)g|png)/.test(file.type)) {
      throw new Error("File extension type is not Image type!");
      return;
    }

    const defaultOptions: IUploadImageOptions = {
      destination: "./upload/",
      prefix: "",
      keepFilename: true,
      maxImageSize: 500
    };

    this._originFile = file;
    this._options = Object.assign({}, defaultOptions, options);
    this._filename = !this._options.keepFilename ? this.generateFilename() : this._originFile.name;
    this._resource = sharp(this._originFile.path);

    this.initialize();
  }

  private initialize() {
    if (!fs.existsSync(this._options.destination!)) {
      fs.mkdirSync(this._options.destination!);
    }
  }

  private generateFilename(): string {
    const seed = crypto.randomBytes(20);
    const hash = crypto
      .createHash("sha1")
      .update(seed)
      .digest("hex");
    return hash;
  }

  get destination(): string {
    return this._options.destination!;
  }

  getFullname(): string {
    return path.resolve(this._options.destination!, this._filename);
  }

  resize(size: Size) {
    if (typeof size === "number") {
      this._resource.resize(size, size, { fit: "outside" });
    } else if (size!.width && size!.height) {
      // size is ISize
    } else {
      // null | undefined
      this._resource.resize(this._options.maxImageSize, this._options.maxImageSize);
    }

    return this;
  }

  createThumbnail(maxSize: number) {}

  save() {}
}

export default UploadImage;
