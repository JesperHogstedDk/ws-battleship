# Battleship game with Websocket
> Static http server and base task packages. 
> By default WebSocket client tries to connect to the 3000 port.

## Requirement
Should run using Node v.23.11.1, which allows node to [execute TypeScript natively](https://nodejs.org/en/learn/typescript/run-natively) allready from [22.6.0](https://nodejs.org/api/typescript.html#type-stripping). 

## Installation
1. Git clone repo: https://github.com/JesperHogstedDk/ws-battleship
2. Run `npm install`
3. Until pull request has been merged use the development branch

## Usage
**Development**

`npm run start:dev`

* Battleship game app served @ `http://localhost:10000` with --watch flag

**Production**

`npm run start`

* App served @ `http://localhost:10000` without nodemon

---

**All commands**

Command | Description
--- | ---
`npm run start:dev` | App served @ `http://localhost:10000` with nodemon
`npm run start` | App served @ `http://localhost:10000` without nodemon

**Note**: replace `npm` with `yarn` in `package.json` if you use yarn.

## Deployment
Javascript has hardcode url, that refers to localhost.  
This url should be replaced when deployed to internet server like render.com.  
Replace front/main.js with main render.com.js before deploying.

## Documentation
[Native WebSocket Client in Node.js](https://nodejs.org/en/learn/getting-started/websocket)
