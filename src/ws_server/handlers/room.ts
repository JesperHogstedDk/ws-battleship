import type { WebSocket } from "ws";
import { ClientSession, Room } from "../../types/types.js";

export const updateRoom = (ws: WebSocket, rooms: Room[], clients: ClientSession[]) => {

    const roomsWithOneUser: {}[] = [];
    if (rooms.length > 0) {
        rooms.forEach(room => {
            console.log('room: ', room);
            if (room.roomUsers.length === 1) {
                room.roomUsers.forEach(user => {
                    const updateRoomData =
                    {
                        roomId: room.roomId,
                        roomUsers:
                            [
                                {
                                    name: `${user.name}'s room! at index ${user.index}`,
                                    index: user.index,
                                }
                            ],
                    };
                    roomsWithOneUser.push(updateRoomData);

                });
            }
        });
        clients.forEach(client => {
            const updateRoom = JSON.stringify({ id: 0, type: 'update_room', data: JSON.stringify(roomsWithOneUser) });
            console.log('updateRoom: ', updateRoom);
            client.ws.send(updateRoom);
        });
    } else {
        clients.forEach(client => {
            const updateRoom = JSON.stringify({ id: 0, type: 'update_room', data: JSON.stringify([]) });
            console.log('updateRoom: ', updateRoom);
            client.ws.send(updateRoom);
        });

    }
}