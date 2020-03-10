import nanoid from "nanoid";

export const MongoPrimary = {
  type: String,
  default: () => nanoid(10),
  unique: true,
  index: true
};
