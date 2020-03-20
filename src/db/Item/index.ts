import { Schema, model, Document } from "mongoose";
import { MongoPrimary } from "../../lib/util";

const Item = new Schema({
  _id: MongoPrimary,

  // 상품명
  name: {
    type: String,
    required: true,
    index: true
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
  pricing: {
    cost: number;
    whole: number;
  };
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

Item.methods.getMargin = function(): number {
  return this.pricing.whole - this.pricing.cost;
};

export interface IItem extends IItemSchema {
  getSubItemCount(): number;
  getMargin(): number;
}

Item.pre<IItem>("save", function() {
  this.updated_at = new Date();
});

export default model<IItem>("item", Item);
