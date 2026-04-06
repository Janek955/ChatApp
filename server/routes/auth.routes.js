import express from "express";
import { register, login } from "../services/auth.services.js"



const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { email, nick, password } = req.body;
        const resoult = await register(email, nick, password);
        res.json(resoult);
    }
    catch {
        res.status(400).json({ error: err.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const resoult = await login(email, password);
        res.json(resoult);
    }
    catch {
        res.status(400).json({ error: err.message })
    }
});

export default router;

