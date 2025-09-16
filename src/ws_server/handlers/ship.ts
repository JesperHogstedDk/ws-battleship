import type { WebSocket } from "ws";
import type { Ships, WSMessage } from "../../types/types.js";

export const startGame = (ws: WebSocket, data: Ships, currentPlayer: string) => {

    const startGameData: Ships = data;
    startGameData.currentPlayerIndex = currentPlayer;

    const startGame: WSMessage = {
        type: 'start_game',
        data: JSON.stringify(startGameData),
        id: 0
    };

    ws.send(JSON.stringify(startGame));
}
