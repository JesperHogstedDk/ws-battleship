import { WebSocket } from "ws";
import type { WSMessage } from "../types.ts";
// import { updateRoomData } from "./rooms.js";

export const handleRegistration = (ws: WebSocket, msg: WSMessage) => {
  if (msg.data && msg.data.name) {

    const regData = {
      name: msg.data.name,
      index: 1,
      error: false,
      errorText: '',
    };

    const reg = JSON.stringify({ id: 0, type: 'reg', data: JSON.stringify(regData) });
    ws.send(reg);
  } else {
    console.log('reg: ','Invalid registration data', )
    ws.send(JSON.stringify({
      type: "reg",
      data: { name: "", index: "", error: true, errorText: "Invalid registration data" },
      id: 0,
    }));
  }
}