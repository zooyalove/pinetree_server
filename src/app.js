require("dotenv").config();

const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const session = require("koa-session");
const websockify = require("koa-websocket");
const morgan = require("koa-morgan");

const { PORT, SECRET_KEY } = process.env;

const api = require("./api");
const ws = require("./ws");

const app = websockify(new Koa());

app.keys = [SECRET_KEY];
app.use(session(app));

app.use(morgan("dev"));

app.use(bodyParser());

app.use(api.routes());

app.ws.use(ws.routes()).use(ws.allowedMethods());

app.listen(parseInt(PORT, 10), () => {
  console.log("Server is listening at", PORT);
});
