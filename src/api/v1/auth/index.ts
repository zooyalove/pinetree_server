import Router from "koa-router";
import * as auth from "./auth.ctrl";

const router = new Router();

router.post("/signin", auth.signIn);
router.post("/signout", auth.signOut);
router.post("/register", auth.register);
router.post("/verify", auth.verifyCode);

export default router;
