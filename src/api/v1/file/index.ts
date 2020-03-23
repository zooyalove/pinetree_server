import Router from "koa-router";
import * as file from "./file.ctrl";

const router = new Router();

router.get("/:filename");
router.post("/", file.uploadImage);

export default router;
