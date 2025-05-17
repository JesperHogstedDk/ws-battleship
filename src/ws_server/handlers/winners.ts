import { WebSocket } from "ws";
import { WSMessage } from "../types.js";

export const handleWinners = (ws: WebSocket, parsed: WSMessage, name: string = '', wins: number = 0) => {
    const updateWinnersData = [
        {
            name: name,
            wins: wins,
        }
    ]
    const updateWinners = JSON.stringify({ id: 0, type: 'update_winners', data: JSON.stringify(updateWinnersData) });
    ws.send(updateWinners);

}