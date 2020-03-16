import { Schema, model, Document, Model } from "mongoose";
import { MongoPrimary } from "lib/util";
import Store from "db/Store";

const Sale = new Schema({
  _id: MongoPrimary,

  // 매출처 아이디
  store_id: {
    type: String,
    required: true
  },

  // 판매물품 리스트
  sell_list: [Schema.Types.Mixed],

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
  sales: {
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

type SellListType = {
  item_id: string;
  item_price: number;
  item_cnt: number;
};

interface ISaleSchema extends Document {
  store_id: string;
  sell_list?: SellListType[];
  extra_charge: number;
  discount: number;
  sales: number;
  payments: {
    CASH: number;
    ACCOUNT: number;
    CARD: number;
  };
  selled_at: Date;
}

export interface ISale extends ISaleSchema {}

/**
 * 특정 거래처와 총 거래한 건수
 */
Sale.statics.getTotalTransactionCountByStoreId = async function(storeId: string): Promise<number> {
  return await this.find({ store_id: storeId }).count();
};

/**
 * 마지막 거래에 대한 정보
 */
Sale.statics.getLastTransactionByStoreId = async function(storeId: string): Promise<any> {
  await this.findOne({ store_id: storeId });
};

export interface ISaleModel extends Model<ISale> {
  getTotalTransactionCountByStoreId(storeId: string): Promise<number>;
}

export default model<ISale, ISaleModel>("sale", Sale);
