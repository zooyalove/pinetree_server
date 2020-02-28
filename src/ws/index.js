const Router = require("koa-router");
const nanoid = require("nanoid");
const { dbNotify } = require("lib/util");

const ws = new Router();

ws.get("/ws", ctx => {
  // console.log(ctx.websocket);
  ctx.websocket.id = nanoid();

  ctx.websocket.on("message", () => {});
  ctx.websocket.on("close", () => {});
});

module.exports = ws;
