import express from "express";
import catchAsync from "../utils/catchAsync.mjs";
import { PrismaClient } from "@prisma/client";
import multer from 'multer'
import config from "../firebase.mjs";
import { initializeApp } from "firebase/app"
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
const router = express.Router();
const prisma = new PrismaClient();

initializeApp(config);
const storage = getStorage();
const upload = multer({ storage: multer.memoryStorage() });

router.route("/")
    .post(upload.single("file"), catchAsync(async (req, res) => {
        const { userId, title, text } = req.body;
        const storageRef = ref(storage, `tickets/${req.file.originalname}`);
        const metadata = {
            contentType: req.file.mimetype
        }

        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
        const downloadURL = await getDownloadURL(snapshot.ref);

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        console.log(user);
        const ticket = await prisma.ticket.create({
            data:
            {
                title: title,
                text: text,
                authorId: user.id,
                file: {
                    create: {
                        file_name: req.file.originalname,
                        url: downloadURL
                    }
                },
            },
            include: {
                file: true
            }

        });
        console.log(ticket);
        console.log('File successfully uploaded.', downloadURL);
        res.status(200).json({ posted: true });
    }))
    .get(catchAsync(async (req, res) => {
        const { userId } = req.body;
        console.log(userId);
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                tickets: {
                    include: {
                        file: true
                    }
                }
            }
        })
        res.status(200);
        res.json(user.tickets);
    }))

export default router;