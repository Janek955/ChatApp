import express from "express";
import { register, login, verifyToken } from "../services/auth.services.js"



const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { email, nick, password } = req.body;
        const resoult = await register(email, nick, password);
        res.json(resoult);
    }
    catch ( err ) {
        res.status(400).json({ error: err.message });
    }
});

router.post("/login", async (req, res) => {
    console.log("login");
    try {
        const { email, password } = req.body;
        const resoult = await login(email, password);
        res.json(resoult);
    }
    catch ( err ){
        res.status(400).json({ error: err.message })
    }
});

router.post("/login/token", async (req, res) => {
    try {
        const { token } = req.body;
        const result = await verifyToken( token );
        res.json(result);
    }
    catch ( err ) {
        res.status(500).json({ error: err.message });
    }
});

export default router;

