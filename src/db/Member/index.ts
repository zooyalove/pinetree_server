import { Document, Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";

import { MongoPrimary } from "../../lib/util";

const { HASH_SALT: salt } = process.env;

const Member = new Schema({
  _id: MongoPrimary,

  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    index: true,
  },

  password: {
    type: String,
    required: true,
  },

  nickname: {
    type: String,
    required: true,
  },

  verified: {
    type: Boolean,
    default: false,
  },

  verify_code: {
    type: String,
    required: true,
    unique: true,
  },

  profile_image: String,

  is_admin: {
    type: Boolean,
    default: false,
  },

  created_at: {
    type: Date,
    default: Date.now,
  },

  updated_at: Date,
});

interface IMemberSchema extends Document {
  email: string;
  password: string;
  nickname: string;
  verified: boolean;
  verify_code: string;
  profile_image?: string;
  is_admin: boolean;
  created_at?: Date;
  updated_at?: Date;
}

Member.methods.validateHash = function (password: string) {
  return bcryptjs.compareSync(password, this.password);
};

export interface IMember extends IMemberSchema {
  validateHash(password: string): boolean;
}

Member.pre<IMember>("save", function (next) {
  if (this.isModified("password")) {
    this.password = bcryptjs.hashSync(this.password, salt);
  }

  this.updated_at = new Date();
});

export default model<IMember>("member", Member);
