const Router = require("koa-router");
const v1 = require("./v1");

const router = new Router();

router.use("/v1", v1.routes());

const api = new Router();

api.use("/api", router.routes());

module.exports = api;
