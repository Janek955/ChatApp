import {db} from "../../config/db.js"
import { saveMessage, saveAttachements } from "../../services/message.services.js";

export async function handleChat(ws, data, {rooms}) {

    const attachments = data.attachments || [];
    
    if (!data.message && attachments.length === 0) return;
    if (data.message && data.message.trim() === "" && attachments.length === 0) return;
    
    const roomCode = ws.roomID;
    const roomClients = rooms[ws.roomID] || [];

    
    const result = await db.query(
        "SELECT id FROM rooms WHERE code = $1",
        [roomCode]
    );

    const room = result.rows[0];
    if (!room) {
        console.log("Room not found: ", roomCode);
        return;
    }


    const messageId = await saveMessage( room.id, ws.userID, data.message || null)
    await saveAttachements(messageId, attachments);

    // BROADCATS
    roomClients.forEach(client => {
        if (client.readyState === 1) {
            client.send(JSON.stringify({
                type: "chat",
                nick: ws.nick,
                message: data.message,
                attachments: attachments,
                messageType: "text",
                profilePicture: "assets/user.png" // Tymczasowe
            }));
        }
    });
    
}