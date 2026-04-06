import pkg from "pg";
const { Pool } = pkg;

export const db = new Pool({
    user: "postgres",
    host: "localhost",
    database: "chat_app",
    password: "pass",
    port: 5432
});
