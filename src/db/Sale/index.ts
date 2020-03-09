import Mongoose from "mongoose";
import { MongoPrimary } from "lib/util";

const Schema = Mongoose.Schema;

const Sale = new Schema({
  _id: MongoPrimary,

  // 매출처 아이디
  store_id: {
    type: String,
    required: true
  },

  // 판매물품 리스트
  sell_list: {
    type: Array,
    default: []
  },

  // 할인금액
  discount: {
    type: Number,
    default: 0
  },

  // 부대비용
  extra_charge: {
    type: Number,
    default: 0
  },

  // 매출금액 (sales or turnover)
  turnover: {
    type: Number,
    default: 0
  },

  // 결제 (CASH: 현금, ACCOUNT: 통장입금, CARD: 카드)
  payments: {
    CASH: {
      type: Number,
      default: 0
    },
    ACCOUNT: {
      type: Number,
      default: 0
    },
    CARD: {
      type: Number,
      default: 0
    }
  },

  // 판매일자
  selled_at: Date
});

export default Mongoose.model("sale", Sale);
