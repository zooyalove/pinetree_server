import Router from "koa-router";
import * as member from "./member.ctrl";

const router = new Router();

router.post("/upload", member.modifyProfileImage);
// router.post("/image", member.modifyProfileImage);

export default router;
