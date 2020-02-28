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

  // 상품형태
  item_type: {
    type: String,
    enum: ["S", "C"],
    required: true
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

  // 상세정보 (사이즈, 그외 정보)
  description: {
    sizing: String,
    info: String
  }
});

module.exports = Mongoose.model("item", Item);
