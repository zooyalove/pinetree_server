import Router from "koa-router";
import * as purchase from "./purchase.ctrl";

const router = new Router();

router.post("/", purchase.addPurchase);

export default router;
