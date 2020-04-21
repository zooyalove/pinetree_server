import { IMiddleware } from "koa-router";
import Item from "../../../db/Item";

/**
 * 전체상품조회
 * GET /api/v1/item/
 */
export const getItemsAll: IMiddleware = async ctx => {
  const items = await Item.find({}, { _id: 1, name: 1, images: 1 }).sort({ name: 1 });

  if (!items) {
    ctx.body = {
      name: "NOT_EXISTS",
    };
    ctx.status = 400;
    return;
  }

  const allItems = items.map(item => {
    return {
      id: item.id,
      name: item.name,
      image: item.images ? item.images[0] : "",
    };
  });

  ctx.body = {
    ...allItems,
  };
};

/**
 * 특정상품조회
 * GET /api/v1/item/:id
 */
export const getItemById: IMiddleware = async ctx => {
  const id = ctx.params.id;
  const item = await Item.findById(id);

  if (!item) {
    ctx.body = {
      name: "NOT_EXISTS",
    };
    ctx.status = 400;
    return;
  }

  interface ISubItem {
    item_name: string;
    item_price: number;
    item_cnt: number;
    item_images: string[] | undefined;
  }

  let sub_items: ISubItem[] | null = null;

  // let sub_items: object[] | null = null;

  if (item.sub_items) {
    sub_items = await Promise.all(
      item.sub_items.map(async subItem => {
        const sub_item = await Item.findById(subItem.item_id, { _id: 0, name: 1, images: 1 });

        return {
          item_name: sub_item!.name,
          item_price: subItem.item_price,
          item_cnt: subItem.item_cnt,
          item_images: sub_item!.images,
        } as ISubItem;
      })
    );
  }

  ctx.body = {
    name: item.name,
    item_type: item.item_type,
    cost: item.pricing.cost,
    whole: item.pricing.whole,
    images: item.images,
    sub_items,
    standard: item.standard,
    unit: item.unit,
    description: item.description,
  };
};

type ItemRequestBody = {
  name: string;
  item_type: string;
  cost: string;
  whole: string;
  sub_items?: string;
  images?: string;
  standard?: string;
  unit?: string;
  description?: string;
};

/**
 * 상품추가
 * POST /api/v1/item/
 */
export const addItem: IMiddleware = async ctx => {
  const {
    name,
    item_type,
    cost,
    whole,
    sub_items,
    images,
    standard,
    unit,
    description,
  }: ItemRequestBody = ctx.request.body;

  let subItems = [];
  if (sub_items) {
    subItems = JSON.parse(sub_items);
  }

  let Images: string[] = [];
  if (images) {
    Images = images.indexOf(",") > -1 ? images.split(",") : [images];
  }

  try {
    const item = await new Item({
      name,
      item_type,
      pricing: {
        cost: parseInt(cost, 10),
        whole: parseInt(whole, 10),
      },
      sub_items: subItems,
      images: Images,
      standard,
      unit,
      description,
    });

    await item.save();

    ctx.body = {
      id: item.id,
      name: item.name,
      price: item.pricing.whole,
      images: item.images,
      subItemCount: item.getSubItemCount(),
    };
  } catch (e) {
    ctx.throw(e, 400);
  }
};

/**
 * 상품수정
 * PUT /api/v1/item/:id
 */
export const modifyItem: IMiddleware = async ctx => {
  const id = ctx.params.id;

  const item = await Item.findById(id);

  if (!item) {
    ctx.body = {
      name: "NOT_EXISTS",
    };
    ctx.status = 400;
    return;
  }

  const {
    name,
    item_type,
    cost,
    whole,
    sub_items,
    images,
    standard,
    unit,
    description,
  }: ItemRequestBody = ctx.request.body;

  let subItems = [];
  if (sub_items) {
    subItems = JSON.parse(sub_items);
  }

  let Images: string[] = [];
  if (images) {
    Images = images.indexOf(",") > -1 ? images.split(",") : [images];
  }

  try {
    item.name = name;
    item.item_type = item_type;
    item.pricing = {
      cost: parseInt(cost, 10),
      whole: parseInt(whole, 10),
    };
    item.sub_items = subItems;
    item.images = Images;
    item.standard = standard;
    item.unit = unit;
    item.description = description;

    await item.save();

    ctx.body = {
      id: item.id,
      name: item.name,
      price: item.pricing.whole,
      images: item.images,
      subItemCount: item.getSubItemCount(),
    };
  } catch (e) {
    ctx.throw(e, 400);
  }
};

/**
 * 상품삭제
 * DELETE /api/v1/item/:id
 */
export const deleteItem: IMiddleware = async ctx => {
  const id = ctx.params.id;

  const item = await Item.findById(id);

  if (!item) {
    ctx.body = {
      name: "NOT_EXISTS",
    };
    ctx.status = 400;
    return;
  }

  await item.remove();

  ctx.body = {
    id,
    name: "REMOVE_SUCCESS",
  };
};
