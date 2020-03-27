import Router from "koa-router";
import * as file from "./file.ctrl";

const router = new Router();

router.get("/:filename", file.getImage);
router.post("/", file.uploadImage);

export default router;
