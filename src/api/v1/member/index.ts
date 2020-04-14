import Router from "koa-router";
import * as member from "./member.ctrl";

const router = new Router();

router.put("/", member.modifyProfile);

export default router;
