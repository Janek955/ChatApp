export async function getRoomHistory(roomId, beforeDate, limit = 50){
    let query = `
        SELECT ...
        WHERE messages.room_id =$1
    `;
    const values = [roomId];
    
    if (beforeDate) {
        query += " AND messages.created_at < $2";
        values.push(beforeDate);
    }
    query += " ORDER BY messasges.created_at DESC LIMIT $3";
    values.push(limit);

    const result = await db.query(query, values);
    return result.rows.reverse();
}