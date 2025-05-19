import { randomUUID } from "node:crypto";
import { WebSocket, WebSocketServer } from "ws";
import type { ClientSession, Room, User, WSMessage } from "../types/types.js";
import { createGame } from "./handlers/game.js";
import { register } from "./handlers/player.js";
import { updateRoom } from "./handlers/room.js";
import { updateWinners } from "./handlers/winners.js";

// let user: User;
// let users: User[] = [];
let room: Room;
let rooms: Room[] = [];
const clients: ClientSession[] = [];

export function createWebSocketServer(port: number) {
  const wss = new WebSocketServer({ port });

  wss.on("connection", (ws: WebSocket) => {
    clients.push({ ws });
    console.log('Ws sessions: ', clients.length)

    ws.on("message", (message: string) => {
      const client = clients.find(c => c.ws === ws);
      const parsed = parseIncomingMessage(ws, message);
      if (!parsed) return;

      switch (parsed.type) {
        case "reg":
          const newUser: User = parsed.data;
          if (newUser) {
            // console.log('newUser: ', newUser)
            const existUser = clients.find(us => us.user?.name === newUser.name)?.user;
            if (existUser) {
              const errorData = { name: "", index: "", error: true, errorText: `User ${newUser.name} allready registered!` };
              console.log('error: ', errorData)
              const reg: WSMessage = { type: "reg", data: JSON.stringify(errorData), id: 0, };
              ws.send(JSON.stringify(reg));
              return;
            } else {
              // newUser.index = users.length;
              // newUser.index = clients.length-1;
              // console.log('Adding user: ', newUser);
              // users.push(newUser);
              if (client) {
                client.user = newUser;
              }
              // console.log('Ws sessions new user: ', clients[clients.length-1].user)
            }
          }
          register(ws, client?.user);
          updateRoom(ws, rooms, clients);
          updateWinners(ws);
          break;

        case "create_room":
          if (!parsed.data) {
            const myRoom = rooms.find(room => room.roomId === client?.roomId);
            if (!myRoom) {
              if (client?.user?.name /*&& client?.user?.index !== undefined*/) {
                let roomUsers: { name: string; /*index: string | number;*/ }[] = [];
                const roomUser = { /*index: client.user.index,*/ name: client.user.name };
                roomUsers.push(roomUser);
                client.roomId = rooms.length;
                room = { roomId: client.roomId, roomUsers: roomUsers };
                const roomId = rooms.push(room);
                console.log('client user, roomId: ', client.user, client.roomId);
              } else {
                console.error('User name or index is undefined, cannot create roomUser');
              }
            }
          }
          updateRoom(ws, rooms, clients);
          updateWinners(ws);
          break;

        case "add_user_to_room":
          if (parsed.data) {
            const myRoom = rooms.find(room => room.roomId === client?.roomId);
            const foundRoom = rooms.find(room => room.roomId === parsed.data.indexRoom);
            const idPlayer1 = client?.user?.name || 'idPlayer1';
            const idPlayer2 = foundRoom?.roomUsers[0].name || 'idPlayer2';
            const wsIdPlayer2 = clients.find(c => c.user?.name === idPlayer2)?.ws;

            if (foundRoom) {
              // remove foundRoom and possible myRoom
              const inx = rooms.findIndex(room => room.roomId === foundRoom?.roomId);
              if (inx !== -1) rooms.splice(inx, 1);
              const inxMyRoom = rooms.findIndex(room => room.roomId === myRoom?.roomId);
              if (inxMyRoom !== -1) rooms.splice(inx, 1);

              const idGame = randomUUID();
              createGame(ws, idGame, idPlayer1);
              if (wsIdPlayer2) {
                createGame(wsIdPlayer2, idGame, idPlayer2);
              }

            } else {
              if (client?.user?.name /*&& client?.user?.index !== undefined*/) {
                let roomUsers: { name: string; /*index: string | number;*/ }[] = [];
                const roomUser = { /*index: client.user.index,*/ name: client.user.name };
                roomUsers.push(roomUser);
                if (client.roomId) {
                  room = { roomId: client.roomId, roomUsers: roomUsers };
                }
                rooms.push(room);
              } else {
                console.error('User name or index is undefined, cannot create roomUser');
              }
            }
          }
          updateRoom(ws, rooms, clients);
          updateWinners(ws);
          break; // add_user_to_room

        case "add_ships":
          if (parsed.data) {
          }
          break;
        default:
          console.log('Received Unknown type: ', parsed);
          ws.send(JSON.stringify({ type: "error", data: { errorText: "Unknown type" } }));

      }
    });
    ws.on("close", () => {
      console.log("Client disconnected");
      const idx = clients.findIndex(c => c.ws === ws);
      if (idx !== -1) clients.splice(idx, 1);
      console.log('Ws sessions: ', clients.length)
    });
  });

  wss.on("error", (error) => {
    console.error(`WebSocket server error: ${error}`);
  });

  wss.on("listening", () => {
    console.log(`WebSocket server is listening on port ${port}`);
  });
}

function parseIncomingMessage(ws: WebSocket, message: string): WSMessage | undefined {
  let parsed: WSMessage;
  try {
    parsed = JSON.parse(message);
    // console.log('Parsed incoming message:', parsed);
    if (typeof parsed.data === "string" && parsed.data !== "") {
      parsed.data = JSON.parse(parsed.data);
    }
    // console.log('Parsed data:', parsed);
    console.log('Parsed incoming message:', parsed);
    return parsed;
  } catch {
    const errorData = { data: { error: true, errorText: "Invalid JSON" } };
    console.log('WS: regError: ', errorData);
    const regError: WSMessage = { type: "reg", data: JSON.stringify(errorData), id: 0 };
    ws.send(JSON.stringify(regError));
    return undefined;
  }
}

