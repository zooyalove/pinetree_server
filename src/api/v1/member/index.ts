import Router from "koa-router";
import * as member from "./member.ctrl";
import { isAuth } from "../middleware/auth";

const router = new Router();

router.post("/upload", isAuth, member.modifyProfileImage);
// router.post("/image", member.modifyProfileImage);

export default router;
