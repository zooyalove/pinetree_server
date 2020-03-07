const Mongoose = require("mongoose");
const { MongoPrimary } = require("lib/util");

const Schema = Mongoose.Schema;

const Store = new Schema({
  _id: MongoPrimary,

  // 거래처명
  name: {
    type: String,
    required: true
  },

  // 지역 카테고리
  local: {
    type: String,
    enum: ["구미", "경주", "김천", "상주/문경", "안동/의성", "기타"],
    required: true
  },

  // 대표자명
  ceo_name: String,

  // 연락처
  telephone: String,

  // 협력업체 형태 ( C: 농장, A: 소매점, S: 셀프제작)
  corp_type: {
    type: String,
    enum: ["C", "A", "S"],
    default: "A"
  },

  // 전잔금
  remainder: {
    type: Number,
    default: 0
  },

  created_at: {
    type: Date,
    default: Date.now
  },

  updated_at: Date
});

module.exports = Mongoose.model("store", Store);
