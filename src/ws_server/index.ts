import { createWebSocketServer } from "./wsServer.js";
import { Server } from "node:http";

export const startWebSockedServer = (httpServer: Server) => {
  createWebSocketServer(httpServer);
};