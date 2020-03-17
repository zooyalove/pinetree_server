import Item from "../../../db/Item";
import { IMiddleware } from "koa-router";

/**
 * 전체상품조회
 * GET /api/v1/item/
 */
export const getItemsAll: IMiddleware = ctx => {};

/**
 * 전체상품조회
 * GET /api/v1/item/:id
 */
export const getItemById: IMiddleware = async ctx => {
  const id = ctx.params.id;
  const item = await Item.findOne({ _id: id });

  if (!item) {
    ctx.body = {
      name: "NOT_EXISTS_ITEM"
    };
    ctx.status = 400;
    return;
  }

  ctx.body = {
    item
  };
};

/**
 * 상품추가
 * POST /api/v1/item/
 */
export const addItem: IMiddleware = async ctx => {
  type RequestBody = {
    name: string;
    store_id: string;
    item_type: string;
    sub_items?: string;
    cost: number;
    whole: number;
    standard?: string;
    unit?: string;
    description?: string;
  };

  const {}: RequestBody = ctx.request.body;

  await new Item({});
};

/**
 * 상품수정
 * PUT /api/v1/item/
 */
export const modifyItem: IMiddleware = ctx => {
  type RequestBody = {
    id: string;
  };
  const { id } = ctx.request.body as RequestBody;
};

/**
 * 상품삭제
 * DELETE /api/v1/item/
 */
export const deleteItem: IMiddleware = ctx => {
  type RequestBody = {
    id: string;
  };
  const { id } = ctx.request.body as RequestBody;
};
