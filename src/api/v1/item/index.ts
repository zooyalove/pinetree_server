import Router from "koa-router";
import * as item from "./item.ctrl";

const router = new Router();

router.post("/register", item.register);
router.put("/modify", item.modify);
router.delete("/delete", item.item_delete);

export default router;
