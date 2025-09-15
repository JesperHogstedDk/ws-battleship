import { httpServer } from "./http_server/index.js";
import { startWebSockedServer } from "./ws_server/index.js";

const HTTP_PORT = 10000;
const WS_PORT = 13000;

console.log(`Start static http serve on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

console.log(`Start web socket on the ${WS_PORT} port!`);
startWebSockedServer(WS_PORT);


