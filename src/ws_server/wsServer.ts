import { WebSocket, WebSocketServer } from "ws";
import { handleRegistration } from "./handlers/player.js";
import { handleUpdateRoom } from "./handlers/room.js";
import { updateWinners } from "./handlers/winners.js";
import type { User, WSMessage } from "../types/types.js"

export let users: User[] = [];
let user: User;

export function createWebSocketServer(port: number) {
  const wss = new WebSocketServer({ port });

  wss.on("connection", (ws: WebSocket) => {
    ws.on("message", (message: string) => {
      let parsed: WSMessage;
      try {
        parsed = JSON.parse(message);
        console.log('Parsed incoming message:', parsed);
      } catch {
        const errorData = { data: { error: true, errorText: "Invalid JSON" } };
        console.log('WS: regError: ', errorData);
        const regError: WSMessage = { type: "reg", data: JSON.stringify(errorData), id: 0 };
        ws.send(JSON.stringify(regError));
        return;
      }
      const foundUser: User | undefined = users.find(ix => ix.index === users.length-1);
      console.log('foundUser: ', foundUser);
      if (foundUser) {        
        user = foundUser;
      } else {
        // console.log('foundUser: ', foundUser)
      }

      switch (parsed.type) {
        case "reg":
          if (typeof parsed.data === "string" && parsed.data !== "" ) {            
            const newUser: User = JSON.parse(parsed.data);
            console.log('newUser: ', newUser)
            user = { index: users.length, name: newUser.name, password: newUser.password };
            if(foundUser !== user){
            console.log('Adding user: ', user);
            users.push(user)
            }
          }
          console.log('user: ', user);
          console.log('users: ', users);
          handleRegistration(ws, user);
          // handleUpdateRoom(ws, parsed, user.name);
          // updateWinners(ws, parsed, user.name);
          break;
        case "create_room":
          // foundUser = users.find(ix => ix.index === users.length);
          const userName = foundUser ? foundUser.name : "Unknown";
          console.log('users: ', users, userName);
          handleUpdateRoom(ws, parsed, userName);
          break;
        case "add_user_to_room":
          ;
          break;
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


