import Store from "../../../db/Store";
import { IMiddleware } from "koa-router";

/**
 * 상점 전체조회
 * GET /api/v1/store
 */
export const getStores: IMiddleware = async ctx => {
  const stores = await Store.find({}, { _id: 1, name: 1, localname: 1 }).sort({ localname: -1 });

  if (!stores) {
    ctx.body = {
      name: "NOT_EXISTS"
    };
    ctx.status = 400;
    return;
  }

  ctx.body = {
    ...stores
  };
};

/**
 * 상점 정보(도매 또는 소매점 특정화) 조회
 * GET /api/v1/store/type/:type(C|A)
 */
export const getStoreByType: IMiddleware = async ctx => {
  const type = ctx.params.type;

  if (type !== "C" || type !== "A") {
    ctx.body = {
      name: "INVALID_REQUEST"
    };
    ctx.status = 400;
    return;
  }

  const typeStores = await Store.find({ corp_type: type }, { _id: 1, name: 1, localname: 1 }).sort({
    localname: -1
  });

  if (!typeStores) {
    ctx.body = {
      name: "NOT_EXISTS"
    };
    ctx.status = 400;
    return;
  }

  ctx.body = {
    ...typeStores
  };
};

/**
 * 특정 상점 정보 조회
 * GET /api/v1/store/:id
 */
export const getStoreById: IMiddleware = async ctx => {
  const id = ctx.params.id;
  await Store.findById(id);
};

/**
 * 상점 추가
 * POST /api/v1/store
 */
export const addStore: IMiddleware = async ctx => {
  type RequestBody = {
    name: string;
    localname: string;
    ceo_name?: string;
    telephone?: string;
    corp_type: string;
    remainder: string;
  };

  const {
    name,
    localname,
    ceo_name,
    telephone,
    corp_type,
    remainder
  }: RequestBody = ctx.request.body;

  const store = new Store({
    name,
    localname,
    ceo_name,
    telephone,
    corp_type,
    remainder: [
      {
        year: new Date().getFullYear(),
        remain_money: parseInt(remainder, 10)
      }
    ]
  });

  await store.save();

  ctx.body = {
    name,
    localname,
    id: store.id
  };
};

/**
 * 상점 정보 수정
 * PUT /api/v1/store/:id
 */
export const modifyStoreById: IMiddleware = async ctx => {
  const id = ctx.params.id;

  type RequestBody = {
    name: string;
    localname: string;
    ceo_name?: string;
    telephone?: string;
    corp_type: string;
    remainder: string;
  };

  const {
    name,
    localname,
    ceo_name,
    telephone,
    corp_type,
    remainder
  }: RequestBody = ctx.request.body;

  const store = await Store.findById(id);

  if (!store) {
    ctx.body = {
      name: "NOT_EXISTS"
    };
    ctx.status = 400;
    return;
  }

  store.name = name;
  store.localname = localname;
  store.ceo_name = ceo_name;
  store.telephone = telephone;
  store.corp_type = corp_type;

  const currentYear = new Date().getFullYear();

  let existsYear = false;
  let remainIndex = -1;

  store.remainder.forEach((remainObj, i) => {
    if (remainObj.year && remainObj.year === currentYear) {
      remainIndex = i;
      existsYear = true;
    }
  });

  if (!existsYear) {
    store.remainder.push({
      year: currentYear,
      remain_money: parseInt(remainder, 10)
    });
  } else {
    store.remainder[remainIndex].remain_money = parseInt(remainder, 10);
  }

  await store.save();

  ctx.body = {
    id,
    name,
    localname
  };
};

/**
 * 상점 정보 삭제
 * DELETE /api/v1/store/:id
 */
export const deleteStoreById: IMiddleware = ctx => {
  const id = ctx.params.id;
};
