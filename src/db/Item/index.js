const Mongoose = require("mongoose");
const { MongoPrimary } = require("lib/util");

const Schema = Mongoose.Schema;

const Item = new Schema({
  _id: MongoPrimary,

  // 상품명
  name: {
    type: String,
    required: true
  },

  // 매입처
  purchase_office: {
    type: String,
    required: true
  },

  // 상품형태(S: 단일상품, C: 복합상품)
  item_type: {
    type: String,
    enum: ["S", "C"],
    required: true
  },

  // 상품구성품 리스트
  /**
   * [{
   *    id: asdfksa...sadfasdg,
   *    cnt: 1,
   *    price: 4000
   * }, ...]
   */
  sub_items: {
    type: Array,
    default: []
  },

  // 가격 리스트 (원가(cost), 도매가(wholesale))
  pricing: {
    cost: {
      type: Number,
      min: 500
    },
    whole: {
      type: Number,
      min: 500
    }
  },

  // 이미지 리스트
  images: {
    type: Array,
    default: []
  },

  // 규격
  standard: String,

  // 단위
  unit: String,

  // 정보
  description: String
});

module.exports = Mongoose.model("item", Item);
