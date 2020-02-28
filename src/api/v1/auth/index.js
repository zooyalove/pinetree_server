const Router = require("koa-router");
const auth = require("./auth.ctrl");

const router = new Router();

router.post("/signin", auth.signIn);
router.post("/signOut", auth.signOut);
router.post("/register", auth.register);
router.get("/verify", auth.verify);

module.exports = router;
