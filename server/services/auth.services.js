import { db } from "../config/db.js";
import bcrypt from "bcrypt";
import crypto from "crypto";


export async function register(email, nick, password) {
    if (!email || !nick || !password ) {
        return res.status(400).json({ error: "No data" });
    }
    const resoult = await db.query(
        "SELECT * FROM users WHERE email = $1 OR nick = $2",
        [email, nick]
    );
    

    if ( resoult.rows.length > 0 ) {
        return res.status(400).json({ error: "User already exists" });
    }
    const hash = await bcrypt.hash(password, 10);

    await db.query(`
        INSERT INTO users (email, nick, password_hash)
        VALUES ($1, $2, $3)
    `, [email, nick, hash]);
    

    return { success: true };
}

export async function login(email, password) {
    const resoult = await db.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );

    const user = resoult.rows[0];

    if( !user ) {
        // return res.status(400).json({ error: "User not found"});
        throw new Error("User not found!");
    }

    const valid = await bcrypt.compare(password, user.password_hash);

    if ( !valid ) {
        // return res.status(400).json({ error: "Wrong Password"});
        throw new Error("Wrong password!");
    }

    const token = crypto.randomBytes(32).toString("hex");

    const expiresAt = new Date( Date.now() + 7 * 24 * 60 * 60 * 1000 );

    await db.query(`
        INSERT INTO sessions (token, user_id, expires_at)
        VALUES ($1, $2, $3)
        `, [token, user.id, expiresAt]
    );


    return{ token };
}

export async function verifyToken(token) {
    if (!token) {
        throw new Error("No token");
    }

    const result = await db.query(`
    SELECT
        users.id AS user_id,
        users.nick,
        sessions.expires_at
    FROM sessions
    JOIN users ON sessions.user_id = users.id
    WHERE token = $1
    `, [token]);
    
    
    
    const session = result.rows[0];
    console.log("SESSION:", session);

    if (!session) throw new Error("Invalid token");

    if (new Date(session.expires_at) < new Date()) {
        await db.query(
            "DELETE FROM sessions WHERE token = $1",
        [token]);

        throw new Error("Session expired");
    }
    return {
        userId: session.user_id,
        nick: session.nick
    };

}