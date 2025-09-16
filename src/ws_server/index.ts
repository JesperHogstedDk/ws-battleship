import { createWebSocketServer } from "./wsServer.js";

export const startWebSockedServer = (WS_PORT: number) => {
  createWebSocketServer(WS_PORT);
};