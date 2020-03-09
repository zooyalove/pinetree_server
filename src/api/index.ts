import Router from "koa-router";
import v1 from "./v1";

const router = new Router();

router.use("/v1", v1.routes());

const api = new Router();

api.use("/api", router.routes());

export default api;
