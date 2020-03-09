import Router from "@koa/router";
import * as auth from "./auth.ctrl";

const router = new Router();

router.post("/signin", auth.signIn);
router.post("/signOut", auth.signOut);
router.post("/register", auth.register);
router.get("/verify", auth.verifyCode);

export default router;
