import Router from "koa-router";
import * as store from "./store.ctrl";

const router = new Router();

router.get("/", store.getStores);
router.get("/type/:type(C|A)", store.getStoreByType);
router.get("/:id", store.getStoreById);
router.post("/", store.addStore);
router.put("/:id", store.modifyStoreById);
router.delete("/:id", store.deleteStoreById);

export default router;
