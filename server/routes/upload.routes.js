import express from "express";
import { processUploadedFile } from "../services/upload.services.js";
import fs from "fs";
import multer from "multer";

const router = express.Router();

const uploadDir = "server_storage/uploads/"

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}


//
// MULTER
//
const uploadLimit = 25; // 25 MB
const MB = 1024 * 1024;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: uploadLimit * MB}
});

router.post("/", upload.single("file"), (req, res) => {
    try {
        const resoult = processUploadedFile(req.file);
        res.json(resoult);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;