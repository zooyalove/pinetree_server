import "./env";
import Koa from "koa";
import bodyParser from "koa-body";
import session from "koa-session";
import websockify from "koa-websocket";
import morgan from "koa-morgan";

const { PORT, SECRET_KEY } = process.env;

import api from "./api";
import ws from "./api/ws";
import { isAuth } from "./middleware/auth";

const app = websockify(new Koa());

app.keys = [SECRET_KEY];
const sessionStore = session(app);

app.use(sessionStore);

app.use(morgan("dev"));

app.use(isAuth);

app.use(bodyParser({ multipart: true }));

app.use(api.routes());

app.ws.use(sessionStore);
app.ws.use(ws);

app.listen(parseInt(PORT, 10), () => {
  console.log("Server is listening at", PORT);
});
