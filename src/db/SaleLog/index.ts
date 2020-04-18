import { Schema, model, Document, Model } from "mongoose";
import { MongoPrimary } from "../../lib/util";
import Store, { IStore } from "../Store";

const SaleLog = new Schema({
  _id: MongoPrimary,

  // 매출처 아이디
  store_id: {
    type: String,
    required: true,
  },

  // 판매물품 리스트
  sell_list: [Schema.Types.Mixed],

  // 할인금액
  discount: {
    type: Number,
    default: 0,
  },

  // 부대비용
  extra_charge: {
    type: Number,
    default: 0,
  },

  // 매출금액 (sales or turnover)
  sales: {
    type: Number,
    default: 0,
  },

  // 결제 (CASH: 현금, ACCOUNT: 통장입금, CARD: 카드)
  payments: {
    CASH: {
      type: Number,
      default: 0,
    },
    ACCOUNT: {
      type: Number,
      default: 0,
    },
    CARD: {
      type: Number,
      default: 0,
    },
  },

  // 판매일자
  selled_at: {
    type: Date,
    required: true,
  },

  // 생성일자
  created_at: {
    type: Date,
    default: Date.now,
  },
});

type SellListType = {
  item_id: string;
  item_price: number;
  item_cnt: number;
};

interface ISaleSchema extends Document {
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
  created_at?: Date;
}

export interface ISale extends ISaleSchema {
  store_id: IStore["_id"];
}

/**
 * 특정 거래처와 총 거래한 건수
 */
SaleLog.statics.getTotalCountByStoreId = async function (storeId: string): Promise<number> {
  return await this.find({ store_id: storeId }).count();
};

/**
 * 마지막 거래에 대한 정보
 */
SaleLog.statics.getLastTransactionByStoreId = async function (
  storeId: string
): Promise<string | null> {
  const lastDate = await this.findOne({ store_id: storeId }, { _id: 0, selled_at: 1 }).sort({
    selled_at: -1,
  });

  if (lastDate) return lastDate.selled_at;
  return null;
};

export interface ISaleModel extends Model<ISale> {
  getTotalCountByStoreId(storeId: string): Promise<number>;
  getLastTransactionByStoreId(storeId: string): Promise<string | null>;
}

export default model<ISale, ISaleModel>("sale", SaleLog, "sale_logs");
