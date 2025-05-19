import { WebSocket } from "ws";

export const updateWinners = (ws: WebSocket, name: string = '', wins: number = 0) => {
    let updateWinnersData = [
        {
            name: name,
            wins: wins,
        },
        {name:'hugo',wins:12}
    ];
    updateWinnersData=[];
    const updateWinners = JSON.stringify({ id: 0, type: 'update_winners', data: JSON.stringify(updateWinnersData) });
    ws.send(updateWinners);
}