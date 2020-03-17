import Router from "koa-router";
import * as item from "./item.ctrl";
import { isAuth } from "../middleware/auth";

const router = new Router();

router.post("/", isAuth, item.addItem);
router.put("/:id", isAuth, item.modifyItem);
router.delete("/:id", isAuth, item.deleteItem);

export default router;
