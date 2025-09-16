import type { WebSocket as WsWebSocket } from "ws";

export type User = {
    // index: number,
    name: string,
    password: string
};

export type WSMessage = {
    type: string;
    data: string | any;
    id: number;
}

export type Room = {
    roomId: number | string,
    roomUsers:
    {
        name: string,
        // index: number | string,
    }[],
};


export type ClientSession = {
    ws: WsWebSocket;
    user?: User;
    roomId?: number | string;
}

export type Game = {
    idGame: number | string,
    idPlayer: number | string,
}

export type Ships = {
    ships: /* player's ships, not enemy's */
    [
        {
            position: {
                x: number,
                y: number,
            },
            direction: boolean,
            length: number,
            type: "small" | "medium" | "large" | "huge",
        }
    ],
    currentPlayerIndex: number | string, /* id of the player in the current game session, who have sent his ships */
}

export type AttackIn = {
    gameId: number | string,
    x: number,
    y: number,
    indexPlayer: number | string, /* id of the player in the current game session */
}

export type RandomAttack = {
    gameId: number | string,
    indexPlayer: number | string, /* id of the player in the current game session */
}

export type AttackFeedback = {
    position:
    {
        x: number,
        y: number,
    },
    currentPlayer: number | string, /* id of the player in the current game session */
    status: "miss" | "killed" | "shot",
}

export type Turn = {
    currentPlayer: number | string, /* id of the player in the current game session */
}

export type Finish = {
    winPlayer: number | string, /* id of the player in the current game session */
}