import Mongoose from "mongoose";
import bcryptjs from "bcryptjs";

import { MongoPrimary } from "lib/util";

const Schema = Mongoose.Schema;

const salt = bcryptjs.genSaltSync();

const Member = new Schema({
  _id: MongoPrimary,

  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    index: true
  },

  hashed_password: {
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

Member.virtual("password")
  .set(function(password) {
    this._password = password;
    this.hashed_password = this.generateHash(password);
  })
  .get(function() {
    return this._password;
  });

Member.methods.generateHash = function(password) {
  return bcryptjs.hashSync(password, salt);
};

Member.methods.validateHash = function(password) {
  return bcryptjs.compareSync(password, this.hashed_password);
};

export default Mongoose.model("member", Member);
