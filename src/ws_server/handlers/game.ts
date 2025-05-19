import type { WebSocket } from "ws";
import { AttackFeedback, AttackIn, Game, Turn, WSMessage } from "../../types/types.js";

export const createGame = (ws: WebSocket,
    idGame: number | string,
    idPlayer: number | string) => {

    const createGameData: Game = { idGame: idGame, idPlayer: idPlayer };

    const createGame: WSMessage = {
        type: 'create_game',
        data: JSON.stringify(createGameData),
        id: 0
    };

    ws.send(JSON.stringify(createGame));
}

export const turn = (ws: WebSocket, curentPlayer: string | number) => {
    const turnData: Turn = { currentPlayer: curentPlayer };
    const turn: WSMessage = {
        type: 'turn',
        data: JSON.stringify(turnData),
        id: 0
    };

    ws.send(JSON.stringify(turn));
}

export const attack = (ws: WebSocket, data: AttackIn, curentPlayer: string | number) => {
    const attackData: AttackFeedback = {
        position: { x: data.x, y: data.y },
        currentPlayer: data.indexPlayer,
        status: "miss",
    }

    const attack: WSMessage = {
        type: 'attack',
        data: JSON.stringify(attackData),
        id: 0
    };

    ws.send(JSON.stringify(attack));
}