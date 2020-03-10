import { Document, Schema, model, Model } from "mongoose";
import bcryptjs from "bcryptjs";

import { MongoPrimary } from "lib/util";

const salt = bcryptjs.genSaltSync();

const MemberSchema = new Schema({
  _id: MongoPrimary,

  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    index: true
  },

  password: {
    type: String,
    required: true
  },

  nickname: String,

  verified: {
    type: Boolean,
    default: false
  },

  verify_code: {
    type: String,
    unique: true
  },

  is_admin: {
    type: Boolean,
    default: false
  },

  created_at: {
    type: Date,
    default: Date.now
  },

  updated_at: Date
});

interface IMemberSchema extends Document {
  email: string;
  password: string;
  nickname?: string;
  verified: boolean;
  verify_code?: string;
  is_admin: boolean;
}

MemberSchema.methods.validateHash = function(password: string) {
  return bcryptjs.compareSync(password, this.hashed_password);
};

export interface IMemeber extends IMemberSchema {
  validateHash(password: string): boolean;
}

MemberSchema.pre<IMemeber>("save", function(next) {
  if (this.isModified("password")) {
    this.password = bcryptjs.hashSync(this.password, salt);
  }
});

export default model<IMemeber>("member", MemberSchema);
