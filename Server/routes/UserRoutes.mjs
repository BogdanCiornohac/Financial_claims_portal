import express from "express";
import catchAsync from "../utils/catchAsync.mjs";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'

const router = express.Router();
const prisma = new PrismaClient();

router.post("/login", catchAsync(async (req, res) => {
    const { username, password } = req.body;

    console.log(username, password);

    const user = await prisma.user.findUnique({
        where: {
            username: username
        }
    })

    console.log(user);
    let compare = false;
    if (user) {
        compare = await bcrypt.compare(password, user.password);
    }
    if (user && compare) {
        // console.log('Same')
        res.status(200).json({ authenticated: true, id: user.id, isAdmin: user.isAdmin, username: user.username, message: "Authentication successful" });
    } else {
        res.status(401).json({ authenticated: false, message: "Invalid username or password" });
    }
}));

router.post("/signup", catchAsync(async (req, res) => {
    const { email, username, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await prisma.user.create({
        data: {
            email: email,
            username: username,
            password: hash
        }
    })
    // console.log(user);

    res.status(201).json({ registered: true, id: user.id, isAdmin: user.isAdmin, username: user.username, message: "Registration successful" });
}));

export default router;