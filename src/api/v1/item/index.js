const Router = require("koa-router");
const item = require("./item.ctrl");

const router = new Router();

router.post("/register", item.register);
router.put("/modify", item.modify);
router.delete("/delete", item.delete);

module.exports = router;
