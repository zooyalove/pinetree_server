import nanoid from "nanoid";

export const MongoPrimary = {
  type: String,
  default: () => nanoid(10)
};
