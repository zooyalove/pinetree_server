const Router = require("koa-router");
const auth = require("./auth");
const account = require("./account");
const item = require("./item");

const router = new Router();

router.use("/auth", auth.routes()).use(auth.allowedMethods());
router.use("/account", account.routes()).use(account.allowedMethods());
router.use("/item", item.routes()).use(item.allowedMethods());

module.exports = router;
