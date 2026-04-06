// import { db } from "../../config/db.js"
import { getRoomHistory } from "./chat_history.js"
import { createRoom, getUserRooms, getRoomByCode, addUserToRoom } from "../../services/room.services.js";

export async function handleJoinRoom( ws, data, {rooms}) {
    
    const { roomCode } = data;

    if (!roomCode) return;

    const room = getRoomByCode(roomCode);

    if (!room)  {
        ws.send(JSON.stringify({
            type: "error",
            message: "Room dosen't exist"
        }));
        return;
    }

    await addUserToRoom(room.id, ws.userId);

    if (!rooms[roomCode]) {
        rooms[roomCode] = [];
    }

    if (rooms[roomCode].includes(ws)){
        console.log(`${ws.nick} dołączył do pokoju ${roomCode}`)
        room[roomCode].push(ws);
    }

    // send info about join
    ws.send(JSON.stringify({
        type: "joined",
        roomCode
    }));

    // get history

    const history = await getRoomHistory(room.id);

    // send history

    ws.send(JSON.stringify({
        type: "history",
        message: history
    }));

}

export async function  handleCreateRoom(ws, data, { rooms }) {

    const room = await createRoom(ws.userId, data.name, ws.nick);

    rooms[room.code] = [];


    ws.send(JSON.stringify({
        type: "roomCreated",
        name: room.name,
        roomCode: room.code,
        icon: room.icon
    }));
}


// SEND USER ROOMS

export async function sendUserRooms(ws) {
    const rooms = await getUserRooms(ws.userId);

    ws.send(JSON.stringify({
        type: "userRooms",
        rooms
    }));
}