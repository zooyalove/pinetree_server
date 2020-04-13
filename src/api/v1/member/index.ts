import Router from "koa-router";
import * as member from "./member.ctrl";

const router = new Router();

router.put("/", member.modifyProfile);
// router.post("/image", member.modifyProfileImage);

export default router;
