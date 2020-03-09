import Router from "koa-router";
import auth from "./auth";
import store from "./store";
import item from "./item";

const router = new Router();

router.use("/auth", auth.routes()).use(auth.allowedMethods());
router.use("/store", store.routes()).use(store.allowedMethods());
router.use("/item", item.routes()).use(item.allowedMethods());

export default router;
