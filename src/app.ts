import "./env";
import http from "http";
import Koa from "koa";
import bodyParser from "koa-body";
import session from "koa-session";
import morgan from "koa-morgan";
import serve from "koa-static";

const { PORT, SECRET_KEY } = process.env;

import websockify from "./websockify";
import api from "./api";
import { isAuth } from "./middleware/auth";
import { uploadDir } from "./lib/dir";

const bodyParserConfig = {
  multipart: true,
  formLimit: "5mb",
  formidable: {
    uploadDir,
  },
};

const app = new Koa();
const server = http.createServer(app.callback());
const servePath =
  process.env.NODE_ENV === "production" ? "./../build/upload" : "./../public/upload";

websockify(server);

app.keys = [SECRET_KEY];
const sessionStore = session(app);

app.use(sessionStore);

app.use(morgan("dev"));

// app.use(isAuth);

app.use(serve(`${__dirname}${servePath}`));

app.use(bodyParser(bodyParserConfig));

app.use(api.routes());

server.listen(parseInt(PORT, 10), () => {
  console.log("Server is listening at", PORT);
});
