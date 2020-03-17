import Router from "koa-router";
import auth from "./auth";
import store from "./store";
import item from "./item";
import member from "./member";

const router = new Router();

router.use("/auth", auth.routes()).use(auth.allowedMethods());
router.use("/store", store.routes()).use(store.allowedMethods());
router.use("/item", item.routes()).use(item.allowedMethods());
router.use("/member", member.routes()).use(member.allowedMethods());

export default router;
