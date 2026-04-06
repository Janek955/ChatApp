import { db } from "../config/db.js";
import { WebSocketServer } from "ws";
import { handleChat } from "./handlers/chat.js";
import { handleCreateRoom, handleJoinRoom, sendUserRooms } from "./handlers/rooms.js";
import { verifyToken } from "../services/auth.services.js";
import { rooms, voiceUsers } from "./state.js";

const handlers = {
    chat: handleChat,
    joinRoom: handleJoinRoom,
    createRoom: handleCreateRoom
};


export async function initWebSocket(server) {
    const wss = new WebSocketServer({server});

    // LOAD ROOMS ON SERVER START <== DO ZMIANY
    const resoult = await db.query("SELECT code FROM rooms");
    const savedRooms = resoult.rows;

    async function loadRooms() {
        const resoult = await db.query("SELECT code FROM rooms");

        resoult.rows.forEach(room => {
            rooms[room.code] = [];
        });
    }
    loadRooms();

    savedRooms.forEach(room => {
        rooms[room.code] = [];
    });

    wss.on("connection", (ws) => {
        try {
        ws.on("message", async (message, isBinary) => {


            // VOICE CHAT

            if ( isBinary ) {
                // const roomClients = voiceUsers[ ws.roomID ] || [];

                // roomClients.forEach( client => {
                //     if ( client !== ws && client.readyState === 1 ) {
                //         client.send( message, { binary: true } )
                //     }
                // });
                return;
            }

            const data = JSON.parse(message.toString());

            if (data.type === "auth") {
                try {
                    const user = await verifyToken(data.token);

                    ws.userId = user.userId;
                    ws.nick = user.nick;
                    await sendUserRooms(ws);

                    ws.send(JSON.stringify({
                        type: "authSuccess",
                        nick: ws.nick
                    }));
                }
                catch (err) {
                    ws.send(JSON.stringify({
                        type: "error",
                        message: err.message
                    }));

                    ws.close();
                }
                return;
            }



            const handler = handlers[data.type];

            if (handler) {
                handler(ws, data, {rooms});
            }
        

            // VOICE CHAT HANDLING

            // if (data.type === "joinVoice") {
            //     const roomCode = ws.roomID;

            //     if ( !voiceUsers[roomCode] ) {
            //         voiceUsers[roomCode] = [];
            //     }

            //     if ( !voiceUsers[roomCode].includes(ws) ) {
            //         voiceUsers[roomCode].push(ws);
            //     }

            //     return;
            // }

            // if ( data.type === "leaveVoice" ) {
            //     const roomCode = ws.roomID;

            //     if ( voiceUsers[roomCode] ) {
            //         voiceUsers[roomCode] = voiceUsers[roomCode].filter( c => c !== ws);
            //     }

            //     return;
            // }

            // CREATE ROOM
            // TAGI: TWOŻENIE POKOI, ROOM CREATE

            

            // AUTH
            // TAGI: AUTH, TOŻSAMOŚĆ, TOKEN

            // if (data.type === "auth") {
            //     const sessionResult = await db.query(`
            //         SELECT users.id, users.nick
            //         FROM sessions
            //         JOIN users ON sessions.user_id = users.id
            //         WHERE token = $1
            //     `, [data.token]);

            //     const session = sessionResult.rows[0];
                
            //     if (!session){
            //         ws.send(JSON.stringify({
            //             type: "error",
            //             message: "Not autorized"
            //         }));
            //         ws.close();
            //         return;
            //     }

            //     if (new Date(session.expires_at) < new Date()) {
            //         await db.query("DELETE FROM sessions WHERE token = $1", [data.token]);

            //         ws.send(JSON.stringify({
            //             type: "error",
            //             message: "Session expired"
            //         }));

            //         ws.close();
            //         return;
            //     }

            //     ws.userId = session.id;
            //     ws.nick = session.nick;

            //     // POKOJE UŻYTKOWNIKÓW
            //     // TAGI: USERS ROOMS, USER ROOM
            //     const resoult = await db.query(`
            //         SELECT
            //         rooms.code,
            //         rooms.name,
            //         rooms.icon
            //         FROM rooms
            //         JOIN room_members
            //         ON room_members.room_id = rooms.id
            //         WHERE room_members.user_id = $1
            //     `, [ws.userId]);
            //     const userRooms = resoult.rows;

            //     // WYSYŁANIE LISTY POKOI DO UŻYTKOWNIKA PO ZALOGOWANIU
            //     ws.send(JSON.stringify({
            //         type: "userRooms",
            //         rooms: userRooms
            //     }));


            //     // WYSYŁANIE INFORMACJI DO UŻYTKOWNIKA PO ZALOGOWANIU
            //     ws.send(JSON.stringify({
            //         type: "authSuccess",
            //         nick: ws.nick //////////////////////////// dodaj w back end odbieranie pp i w reqeście
            //         //profilePicture: ws.profile_picture
            //         // i ta cała reszta
            //     }));





            //     return;
            // }
        });} catch (err) {
        console.error("WS ERROR:", err);

        ws.send(JSON.stringify({
            type: "error",
            message: err.message
        }));
    }
        ws.on("close", () =>{
            if(ws.roomID && rooms[ws.roomID]) {
                rooms[ws.roomID] = rooms[ws.roomID].filter(c => c !== ws);
            }
        });
    });
}