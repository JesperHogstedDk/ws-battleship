import { WebSocket } from "ws";
import { WSMessage, type User } from "../../types/types.js";

export const register = (ws: WebSocket, user: User | undefined) => {
  if (user) {
    const regData = {
      name: user.name,
      // index: user.index,
      error: false,
      errorText: '',
    };
    const reg: WSMessage = { type: 'reg', data: JSON.stringify(regData), id: 0 };
    ws.send(JSON.stringify(reg));
  } else {
    const errorData = { name: "", index: "", error: true, errorText: "Invalid registration data" };
    console.log('player.errorData: ', errorData)
    const reg: WSMessage = { type: "reg", data: JSON.stringify(errorData), id: 0, };
    ws.send(JSON.stringify(reg));
  }
}