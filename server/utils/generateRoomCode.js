import crypto from "crypto";

export function generateRoomCode(){
    return crypto.randomBytes(3).toString("hex").toUpperCase();
}