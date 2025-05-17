import { httpServer } from "./http_server/index.js";
import { startWebSockedServer } from "./ws_server/index.js";

const HTTP_PORT = 8181;
const WS_PORT = 3000;

console.log(`Start static http serve on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

startWebSockedServer(WS_PORT);


