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
  const item = await Item.findById(id);

  if (!item) {
    ctx.body = {
      name: "NOT_EXISTS"
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
 * PUT /api/v1/item/:id
 */
export const modifyItem: IMiddleware = ctx => {
  const id = ctx.params.id;
};

/**
 * 상품삭제
 * DELETE /api/v1/item/:id
 */
export const deleteItem: IMiddleware = ctx => {
  const id = ctx.params.id;
};
