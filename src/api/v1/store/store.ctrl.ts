import { IMiddleware } from "koa-router";
import Store from "../../../db/Store";
import PurchaseLog from "../../../db/PurchaseLog";
import SaleLog from "../../../db/SaleLog";

/**
 * 상점 전체조회
 * GET /api/v1/store
 */
export const getStores: IMiddleware = async ctx => {
  const stores = await Store.find({}, { _id: 1, name: 1, localname: 1 }).sort({ localname: -1 });

  if (!stores) {
    ctx.body = {
      name: "NOT_EXISTS",
    };
    ctx.status = 400;
    return;
  }

  ctx.body = {
    ...stores,
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
      name: "INVALID_REQUEST",
    };
    ctx.status = 400;
    return;
  }

  const typeStores = await Store.find({ corp_type: type }, { _id: 1, name: 1, localname: 1 }).sort({
    localname: -1,
  });

  if (!typeStores) {
    ctx.body = {
      name: "NOT_EXISTS",
    };
    ctx.status = 400;
    return;
  }

  ctx.body = {
    ...typeStores,
  };
};

/**
 * 특정 상점 정보 조회
 * GET /api/v1/store/:id
 */
export const getStoreById: IMiddleware = async ctx => {
  const id = ctx.params.id;

  if (!id) {
    ctx.body = {
      name: "REQUIRED_ID_INFO",
    };
    ctx.status = 401;
    return;
  }

  const store = await Store.findById(id, { _id: 0 });

  if (!store) {
    ctx.body = {
      name: "NOT_EXISTS",
    };
    ctx.status = 400;
    return;
  }

  let lastTransaction;
  let totalCount = 0;

  if (store.corp_type === "C") {
    totalCount = await PurchaseLog.getTotalCountByStoreId(store.id);
    lastTransaction = await PurchaseLog.getLastTransactionByStoreId(store.id);
  } else {
    totalCount = await SaleLog.getTotalCountByStoreId(store.id);
    lastTransaction = await SaleLog.getLastTransactionByStoreId(store.id);
  }

  ctx.body = {
    totalCount,
    lastTransaction,
    ceo_name: store.ceo_name,
    telephone: store.telephone,
    corp_type: store.corp_type,
    remainder: store.remainder[store.remainder.length - 1].remain_money,
  };
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
    remainder,
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
        remain_money: parseInt(remainder, 10),
      },
    ],
  });

  await store.save();

  ctx.body = {
    name,
    localname,
    id: store.id,
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
  };

  const { name, localname, ceo_name, telephone, corp_type }: RequestBody = ctx.request.body;

  const store = await Store.findById(id);

  if (!store) {
    ctx.body = {
      name: "NOT_EXISTS",
    };
    ctx.status = 400;
    return;
  }

  store.name = name;
  store.localname = localname;
  store.ceo_name = ceo_name;
  store.telephone = telephone;
  store.corp_type = corp_type;

  await store.save();

  ctx.body = {
    id,
    name,
    localname,
  };
};

/**
 * 상점 정보 삭제
 * DELETE /api/v1/store/:id
 */
export const deleteStoreById: IMiddleware = async ctx => {
  const id = ctx.params.id;

  if (!id) {
    ctx.body = {
      name: "REQUIRED_ID_INFO",
    };
    ctx.status = 401;
    return;
  }

  const store = await Store.findById(id);

  if (!store) {
    ctx.body = {
      name: "NOT_EXISTS",
    };
    ctx.status = 400;
    return;
  }

  await store.remove();

  ctx.body = {
    id,
    name: "REMOVE_SUCCESS",
  };
};
