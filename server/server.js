import express from "express";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";
import { initWebSocket } from "./ws/socket.js";
import authRoutes from "./routes/auth.routes.js"
import uploadRoutes from "./routes/upload.routes.js"

// test

const app = express();

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.static("public"));
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);

const server = app.listen(3000, () => {
    console.log("Serwer działa na http://localhost:3000");
});

initWebSocket(server);


app.get("/room/:code", (req, res) => {
    res.sendFile(path.resolve("public/messenger.html"));
});

app.use("/files", express.static("server_storage/uploads"));

// CZYSZCZENIE BAZY DANYCH ZE ŚMIECI

setInterval(() => {

}, 1 * 60 * 60 * 1000); // godzina ; godzina, minuta, sekunda, milisekunda