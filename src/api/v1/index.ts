import Router from "koa-router";
import auth from "./auth";
import store from "./store";
import item from "./item";
import member from "./member";
import file from "./file";
import sale from "./sale";
import purchase from "./purchase";

const router = new Router();

router.use("/auth", auth.routes()).use(auth.allowedMethods());
router.use("/store", store.routes()).use(store.allowedMethods());
router.use("/item", item.routes()).use(item.allowedMethods());
router.use("/member", member.routes()).use(member.allowedMethods());
router.use("/file", file.routes()).use(file.allowedMethods());
router.use("/sale", sale.routes()).use(sale.allowedMethods());
router.use("/purchase", purchase.routes()).use(purchase.allowedMethods());

export default router;
