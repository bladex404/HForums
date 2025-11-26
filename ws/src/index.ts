import express, { Request } from "express";
import http from "node:http";
import { Socket } from "node:net";
import WebSocket, { WebSocketServer } from "ws";

interface CustomRequest extends Request {
  userId?: string;
  toUserId?: string;
}

const PORT = 4000;
const app = express();
const server = http.createServer(app);

const wss = new WebSocketServer({ noServer: true });

interface Data {
  userId: string;
  conversationId: number;
  text: string;
}
let toUserId: any;
server.on("upgrade", function (req: CustomRequest, socket: Socket, head) {
  socket.on("error", console.error);

  // Example: grab token/userId from querystring
  const url = new URL(req.url || "", `http://${req.headers.host}`);

  console.log(url);
  const userId = url.searchParams.get("userId");
  toUserId = url.searchParams.get("toUserId");

  if (!userId || !toUserId) {
    socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
    socket.destroy();
    return;
  }

  req.userId = userId;
  req.toUserId = toUserId;
  wss.handleUpgrade(req, socket, head, function (ws) {
    wss.emit("connection", ws, req);
  });
});

wss.on("connection", function connection(ws, _: CustomRequest) {
  ws.on("error", console.error);

  ws.on("message", async function message(raw) {
    try {
      const message: Data = JSON.parse(raw.toString());
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(message));
        }
      });

      const res = await fetch(
        `http://localhost:3000/api/v1/chats/messages/:${toUserId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(message),
        },
      );
      console.log(await res.json());
    } catch (error) {
      console.error(error);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
