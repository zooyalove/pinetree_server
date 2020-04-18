import { Schema, model, Document, Model } from "mongoose";
import { MongoPrimary } from "../../lib/util";
import { IStore } from "db/Store";

const PurchaseLog = new Schema({
  _id: MongoPrimary,

  store_id: {
    type: String,
    required: true,
  },

  purchase_list: [Schema.Types.Mixed],

  purchased_at: {
    type: Date,
    required: true,
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
});

type PurchaseListType = {
  item_id: string;
  item_cnt: number;
  item_price: number;
};

interface IPurchaseSchema extends Document {
  purchase_list: PurchaseListType | PurchaseListType[];
  purchased_at: Date;
  created_at?: Date;
}

PurchaseLog.methods.getCurrentTotal = function (): number {
  if (typeof this.purchase_list === "object") {
    return this.purchase_list.item_price;
  }

  let total = 0;

  this.purchase_list.forEach((item: PurchaseListType) => {
    total += item.item_price;
  });

  return total;
};

interface IPurchase extends IPurchaseSchema {
  store_id: IStore["_id"];
  getCurrentTotal(): number;
}

/**
 * 특정 거래처와 총 거래한 건수
 */
PurchaseLog.statics.getTotalCountByStoreId = async function (storeId: string): Promise<number> {
  return await this.find({ store_id: storeId }).count();
};

/**
 * 마지막 거래에 대한 정보
 */
PurchaseLog.statics.getLastTransactionByStoreId = async function (
  storeId: string
): Promise<string | null> {
  const lastDate = await this.findOne({ store_id: storeId }, { _id: 0, purchased_at: 1 }).sort({
    purchased_at: -1,
  });

  if (lastDate) return lastDate.purchased_at;
  return null;
};

export interface IPurchaseModel extends Model<IPurchase> {
  getTotalCountByStoreId(storeId: string): Promise<number>;
  getLastTransactionByStoreId(storeId: string): Promise<string | null>;
}

export default model<IPurchase, IPurchaseModel>("purchase_log", PurchaseLog, "purchase_logs");
