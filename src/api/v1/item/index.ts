import Router from "koa-router";
import * as item from "./item.ctrl";

const router = new Router();

router.get("/", item.getItemsAll);
router.get("/:id", item.getItemById);
router.post("/", item.addItem);
router.put("/:id", item.modifyItem);
router.delete("/:id", item.deleteItem);

export default router;
