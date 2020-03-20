import { Schema, model, Document } from "mongoose";
import { MongoPrimary } from "../../lib/util";

const PurchaseLog = new Schema({
  _id: MongoPrimary,

  store_id: {
    type: String,
    required: true
  },

  purchase_list: [Schema.Types.Mixed],

  purchase_at: {
    type: Date,
    required: true
  }
});

type PurchaseListType = {
  item_id: string;
  item_cnt: number;
  item_price: number;
};

interface IPurchaseSchema extends Document {
  store_id: string;
  purchase_list: PurchaseListType | PurchaseListType[];
  purchase_at: Date;
}

PurchaseLog.methods.getCurrentTotal = function(): number {
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
  getCurrentTotal(): number;
}

export default model<IPurchase>("purchase_log", PurchaseLog, "purchase_logs");
