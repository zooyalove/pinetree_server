import "./env";
import http from "http";
import Koa from "koa";
import bodyParser from "koa-body";
import session from "koa-session";
import morgan from "koa-morgan";

const { PORT, SECRET_KEY } = process.env;

import websockify from "./websockify";
import api from "./api";
import { isAuth } from "./middleware/auth";

const app = new Koa();
const server = http.createServer(app.callback());

websockify(server);

app.keys = [SECRET_KEY];
const sessionStore = session(app);

app.use(sessionStore);

app.use(morgan("dev"));

app.use(isAuth);

app.use(bodyParser({ multipart: true }));

app.use(api.routes());

server.listen(parseInt(PORT, 10), () => {
  console.log("Server is listening at", PORT);
});
