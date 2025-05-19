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
    roomId: number | string ,
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