import Router from "koa-router";
import { MiddlewareContext } from "koa-websocket";
import nanoid from "nanoid";
import DBNotify from "lib/dbNotify";

const ws = new Router();

ws.get("/ws", (ctx: MiddlewareContext) => {
  // console.log(ctx.websocket);
  ctx.websocket.id = nanoid();

  ctx.websocket.on("message", () => {});
  ctx.websocket.on("close", () => {});
});

export default ws;
