import { Schema, model, Document, Model } from "mongoose";
import { MongoPrimary } from "../../lib/util";

const Store = new Schema({
  _id: MongoPrimary,

  // 거래처명
  name: {
    type: String,
    required: true,
    trim: true,
  },

  // 지역 카테고리
  localname: {
    type: String,
    enum: ["구미", "경주", "김천", "상주/문경", "안동/의성", "기타"],
    required: true,
  },

  // 대표자명
  ceo_name: String,

  // 연락처
  telephone: String,

  // 협력업체 형태 ( C: 농장, A: 소매점)
  corp_type: {
    type: String,
    enum: ["C", "A"],
    default: "A",
  },

  // 전잔금
  remainder: [Schema.Types.Mixed],

  created_at: {
    type: Date,
    default: Date.now,
  },

  updated_at: Date,
});

export type RemainderType = {
  year: number;
  remain_money: number;
};

interface IStoreSchema extends Document {
  name: string;
  localname: string;
  ceo_name?: string;
  telephone?: string;
  corp_type: string;
  remainder: RemainderType[];
  created_at?: Date;
  updated_at?: Date;
}

export interface IStore extends IStoreSchema {}

Store.pre<IStore>("save", function (next) {
  this.updated_at = new Date();
});

export default model<IStore>("store", Store);
