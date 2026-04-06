import { db } from "../config/db.js";
import { generateRoomCode } from "../utils/generateRoomCode.js";

export async function createRoom(userId, name, nick) {
    let roomCode;
    let exists = true
    while(exists){
        roomCode = generateRoomCode();
        const existsResult = await db.query(
            "SELECT 1 FROM rooms WHERE code = $1",
            [roomCode]
        );
        exists = existsResult.rows.length > 0;
    }

    const roomName = name || ws.nick + "'s Room"; // nie wiem czy ws.nick istnieje
    const icon = "assets/user.png";

    const insertRoom = await db.query(`
        INSERT INTO rooms (code, name, icon, owner_id)
        VALUES ($1, $2, $3, $4)
        RETURNING id
        `, [roomCode, roomName, icon, ws.userId]
    );

    const room = insertRoom.rows[0].id;

    await db.query(`
        INSERT INTO room_members (room_id, user_id)
        VALUES ($1, $2)
        `, [room.id, userId]
    );

    return room;
}

export async function getUserRooms(userId) {
    const result = await db.query(`
        SELECT
            rooms.code,
            rooms.name,
            rooms.icon,
        FROM rooms
        JOIN rooms_members
        ON room_members.room.id = rooms.id
        WHERE room_members.user_id = $1
    `, [userId]);

    return result.rows;
}

export async function getRoomByCode(roomCode) {
    const result = await db.query(
        "SELECT * FROM rooms WHERE code = $1",
        [roomCode]
    );

    return result.rows[0];
}

export async function addUserToRoom(roomId, userId) {
    const exists = await db.query(`
        SELECT 1 FROM room_members
        WHERE room_id = $1 AND user_id = $2
    `, [roomId, userId]);

    if (exists.rows.length === 0) {
        await db.query(`
            INSERT INTO room_members (room_id, user_id)
            VALUES ($1, $2)
        `, [roomId, userId]);
    }
}