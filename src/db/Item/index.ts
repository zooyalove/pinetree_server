import { Schema, model, Model, Document } from "mongoose";
import { MongoPrimary } from "lib/util";
import Store, { IStore } from "db/Store";

const Item = new Schema({
  _id: MongoPrimary,

  // 상품명
  name: {
    type: String,
    required: true,
    index: true
  },

  // 매입처
  store_id: {
    type: String,
    required: true
  },

  // 상품형태(S: 단일상품, C: 복합상품)
  item_type: {
    type: String,
    enum: ["S", "C"],
    required: true
  },

  /**
   * 상품구성품 리스트
   * [{
   *    item_id: asdfksa...sadfasdg,
   *    item_price: 4000,
   *    item_cnt: 1
   * }, ...]
   */
  sub_items: [Schema.Types.Mixed],

  // 가격 리스트 (원가(cost), 도매가(wholesale))
  pricing: {
    cost: {
      type: Number,
      required: true
    },
    whole: {
      type: Number,
      required: true
    }
  },

  // 이미지 리스트
  images: [String],

  // 규격
  standard: String,

  // 단위
  unit: String,

  // 정보
  description: String,

  created_at: {
    type: Date,
    default: Date.now
  },

  updated_at: Date
});

enum ItemType {
  Single = "S",
  Complex = "C"
}

export type SubItemType = {
  item_id: string;
  item_price: number;
  item_cnt: number;
};

interface IItemSchema extends Document {
  name: string;
  item_type: ItemType;
  sub_items?: SubItemType[];
  images?: string[];
  standard?: string;
  unit?: string;
  description?: string;
  created_at: Date;
  updated_at?: Date;
}

Item.methods.getSubItemCount = function(): number {
  return this.sub_items ? this.sub_items.count() : 0;
};

Item.methods.getStoreInfo = async function(): Promise<any> {
  const store = await Store.findOne({ _id: this._id }, { _id: 0, name: 1, local: 1 });

  if (store) {
    return {
      name: store.name,
      local: store.local
    };
  }
  return null;
};

export interface IItem extends IItemSchema {
  store_id: IStore["_id"];
  getSubItemCount(): number;
  getStoreInfo(): Promise<any>;
}

export default model<IItem>("item", Item);
