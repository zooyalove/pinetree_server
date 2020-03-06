const Router = require("koa-router");
const auth = require("./auth");
const store = require("./store");
const item = require("./item");

const router = new Router();

router.use("/auth", auth.routes()).use(auth.allowedMethods());
router.use("/store", store.routes()).use(store.allowedMethods());
router.use("/item", item.routes()).use(item.allowedMethods());

module.exports = router;
