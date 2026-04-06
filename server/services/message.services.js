import {db} from "../config/db.js"

export async function  saveMessage(roomId, userId, content) {
    const result = await db.query(`
        INSERT INTO messages (room_id, user_id, content)
        VALUES ($1, $2, $3)
        RETURNING id
    ` ,[
        roomId,
        userId,
        content
    ]);
    return result.rows[0].id;

}

export async function saveAttachements(messageId, attachments) {
    for (const file of attachments) {
        await db.query(`
            INSERT INTO message_attachments (message_id, file_url, file_type)
            VALUES ($1, $2, $3)
        `, [messageId, file.fileUrl, file.fileType]);
    };
}