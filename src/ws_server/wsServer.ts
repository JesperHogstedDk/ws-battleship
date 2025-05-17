import { WebSocket, WebSocketServer } from "ws";
import { handleRegistration } from "./handlers/registration.js";
import type { WSMessage } from "./types.ts";
import { handleRoom } from "./handlers/room.js";
import { handleWinners } from "./handlers/winners.js";


type user = {id:number, name:string};
let users: user[] = [];

export function createWebSocketServer(port: number) {
  const wss = new WebSocketServer({ port });

  wss.on("connection", (ws: WebSocket) => {
    ws.on("message", (message: string) => {
      let parsed: WSMessage;
      try {
        parsed = JSON.parse(message);

        if (typeof parsed.data === "string" && parsed.data !== "") {
          parsed.data = JSON.parse(parsed.data);
        }
      } catch {
        ws.send(JSON.stringify({ type: "error", data: { errorText: "Invalid JSON" } }));
        return;
      }
      console.log('Parsed message:', parsed)

      switch (parsed.type) {
        case "reg":
          if (parsed.data && parsed.data.name) {
            const user = parsed.data.name;
            users.push({ id: 1, name: user })
          }
          console.log('users: ', users);
          handleRegistration(ws, parsed);
          handleWinners(ws, parsed);
          break;
        case "create_room":
          const foundUser = users.find(ix => ix.id === 1);
          const userName = foundUser ? foundUser.name : "Unknown";
          console.log('users: ', users, userName);
          handleRoom(ws, parsed, userName)
        default:
          console.log('Received Unknown type: ', parsed)
          ws.send(JSON.stringify({ type: "error", data: { errorText: "Unknown type" } }));
      }
    });
    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });

  wss.on("error", (error) => {
    console.error(`WebSocket server error: ${error}`);
  });

  wss.on("listening", () => {
    console.log(`WebSocket server is listening on port ${port}`);
  });
}


