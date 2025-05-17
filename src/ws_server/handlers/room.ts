import type { WebSocket } from "ws";
import { WSMessage } from "../types.js";

export const handleRoom = (ws: WebSocket, msg: WSMessage, name: string = '') => {
    const getRoomIndex = 1;
    if (msg.data === '') {
        const updateRoomData = [
            {
                roomId: 0,
                roomUsers:
                    [
                        {
                            name: `${name}'s room!`,
                            index: getRoomIndex,
                        }
                    ],
            },
        ];

        const updateRoom = JSON.stringify({ id: 0, type: 'update_room', data: JSON.stringify(updateRoomData) });

        console.log('updateRoom', updateRoom);

        ws.send(updateRoom);

    } else {
        console.log('update_room: ', 'Invalid update room data')
        ws.send(JSON.stringify({
            type: "update_room",
            data: JSON.stringify({ name: "", index: "", error: true, errorText: "Invalid update room data" }),
            id: 0,
        }));
    }
}