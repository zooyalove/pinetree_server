import Router from "koa-router";
import * as sale from "./sale.ctrl";

const router = new Router();

router.post("/", sale.addSale);

export default router;
