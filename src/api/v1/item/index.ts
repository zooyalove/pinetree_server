import Router from "koa-router";
import * as item from "./item.ctrl";
// import { isAuth } from "../middleware/auth";

const router = new Router();

router.get("/", item.getItemsAll);
router.post("/", item.addItem);
router.put("/:id", item.modifyItem);
router.delete("/:id", item.deleteItem);

export default router;
