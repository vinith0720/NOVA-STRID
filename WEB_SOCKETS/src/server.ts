import { WebSocketServer } from "ws";
// import WebSocket from "ws";
import brcrypt from "bcrypt";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (socket) => {
  console.log("Client connected..,", wss.clients.size);
  // console.log("Clients : ", wss.clients);

  socket.on("open", () => {
    console.log("a new connection is open");
    socket.send("its openn");
  });

  socket.on("message", async (data) => {
    if (data.toString() === "hii") {
      socket.send("Welcome to the server ");
    } else {
      console.log("Received", data.toString());
      const res = await brcrypt.hash(data.toLocaleString(), 10);
      socket.send(res);
    }
  });

  socket.on("close", () => {
    console.log(
      "Client disconnected,The remaining clients are ",
      wss.clients.size
    );
  });
});

console.log("web socket ruuning on 8080");
