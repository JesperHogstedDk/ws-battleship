import { WebSocketServer, WebSocket } from "ws";
import { httpServer } from "./http_server/index.js";

const HTTP_PORT = 8181;
const WS_PORT = 3000;

const wss = new WebSocketServer({ port: WS_PORT });
wss.on("connection", (ws: WebSocket) => {
    console.log("New client connected");
    ws.on("message", (message: any) => {
        console.log(`Received message: ${message}`);

        let parsed;
        try {
            parsed = JSON.parse(message);
            // Hvis data er en string, så parse den også
            if (typeof parsed.data === "string") {
                parsed.data = JSON.parse(parsed.data);
            }
            console.log('parsed: ', parsed)
        } catch (e) {
            ws.send(JSON.stringify({
                type: "reg",
                data: {
                    name: "",
                    index: "",
                    error: true,
                    errorText: "Invalid JSON",
                },
                id: 0,
            }));
            return;
        }

        if (parsed.type === "reg" && parsed.data && parsed.data.name) {
            const reply = {
                type: "reg",
                data: {
                    name: parsed.data.name,
                    index: 1,
                    error: false,
                    errorText: '',
                },
                id: 0,
            };

            const replyJson = JSON.stringify({id:0, type:'reg', data: JSON.stringify(reply)})
            console.log('about to send:', replyJson);
            ws.send(replyJson);

        } else {
            ws.send(JSON.stringify({
                type: "reg",
                data: {
                    name: "",
                    index: "",
                    error: true,
                    errorText: "Invalid registration data",
                },
                id: 0,
            }));
        }
    });
    ws.on("close", () => {
        console.log("Client disconnected");
    });
});

wss.on("listening", () => {
    console.log(`WebSocket server is listening on port ${WS_PORT}`);
});
wss.on("error", (error) => {
    console.error(`WebSocket server error: ${error}`);
});

console.log(`Start static http serve on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);
