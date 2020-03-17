import ws from "koa-route";
import nanoid from "nanoid";
import DBNotify from "../../lib/dbNotify";

export default ws.all("/ws", ctx => {
  // ctx.websocket.id = nanoid();

  DBNotify.subscribe("signin", (data: any) => {
    ctx.websocket.send(data);
  });
  // ctx.websocket.on("message", message => {
  //   console.log(message);
  //   console.log(ctx.websocket);
  // });
  ctx.websocket.on("close", () => {});
});
