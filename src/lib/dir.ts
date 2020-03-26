import path from "path";

export const uploadDir =
  process.env.NODE_ENV === "development"
    ? path.join(process.cwd(), "public", "upload")
    : path.join(process.cwd(), "build", "upload");
