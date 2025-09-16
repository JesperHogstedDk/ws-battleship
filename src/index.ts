import { httpServer } from "./http_server/index.js";
import { startWebSockedServer } from "./ws_server/index.js";
import * as dotenv from "dotenv"

dotenv.config();

console.log("NODE_ENV: ", process.env.NODE_ENV);

if (!process.env.HTTP_WS_PORT ) {
    console.error(
        'Some environment variables is missing. Please define it in your .env file. Exiting...',
    );
    process.exit(1);
}

const HTTP_WS_PORT = process.env.HTTP_WS_PORT ;

console.log(`Start static http serve on the ${HTTP_WS_PORT} port!`);
httpServer.listen(HTTP_WS_PORT);

console.log(`Starting ws server !`);
startWebSockedServer(httpServer);


