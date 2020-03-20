import http from "http";
import WebSocket from "ws";

const websockify = (server: http.Server): WebSocket.Server => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", ws => {
    ws.on("message", data => {
      console.log(data);
      ws.send("Hi!, Server is sended!");
    });
    ws.on("close", () => {
      console.log("WS Client is closed");
    });
  });

  return wss;
};

export default websockify;
