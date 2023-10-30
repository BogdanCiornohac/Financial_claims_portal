import express from "express";
import catchAsync from "../utils/catchAsync.mjs";
import { PrismaClient } from "@prisma/client";
import multer from 'multer'
import config from "../firebase.mjs";
import { initializeApp } from "firebase/app"
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import isLoggedIn from "../middleware/isLoggedIn.mjs";
import isAdmin from "../middleware/isAdmin.mjs";
import isLoggedInParams from "../middleware/isLoggedInParams.mjs";
import ExpressError from "../utils/ExpressError.mjs";
const router = express.Router();
const prisma = new PrismaClient();

initializeApp(config);
const storage = getStorage();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("file"), catchAsync(isLoggedIn), catchAsync(async (req, res) => {
    const { title, text } = req.body;
    const storageRef = ref(storage, `tickets/${req.file.originalname}`);
    const metadata = {
        contentType: req.file.mimetype
    }

    const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
    const downloadURL = await getDownloadURL(snapshot.ref);

    const user = res.locals.user;

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
router.get("/:userId", catchAsync(isLoggedInParams), catchAsync(async (req, res) => {
    const { userId } = req.params;
    const user = res.locals.user;
    if (!user.isAdmin) {
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
        res.json({ tickets: user.tickets });
    } else {
        const tickets = await prisma.ticket.findMany({
            include: {
                author: true,
                file: true
            }
        });
        res.status(200).json({ tickets })
    }
}))
router.patch('/:ticketId/approve', catchAsync(isLoggedIn), isAdmin, catchAsync(async (req, res) => {
    const { ticketId } = req.params;
    let ticket = await prisma.ticket.findUnique({
        where: {
            id: ticketId
        }
    })
    if (!ticket || !ticket.inProgress) {
        throw (new ExpressError('invalid ticket update', 500));
    }
    ticket = await prisma.ticket.update({
        where: {
            id: ticketId
        },
        data: {
            aproved: true,
            inProgress: false
        }
    })
    console.log(ticket);
    res.status(200).json({ updated: true });
}))

router.patch('/:ticketId/decline', catchAsync(isLoggedIn), isAdmin, catchAsync(async (req, res) => {
    const { ticketId } = req.params;
    let ticket = await prisma.ticket.findUnique({
        where: {
            id: ticketId
        }
    })
    if (!ticket || !ticket.inProgress) {
        throw (new ExpressError('invalid ticket update', 500));
    }
    ticket = await prisma.ticket.update({
        where: {
            id: ticketId
        },
        data: {
            declined: true,
            inProgress: false
        }
    })
    console.log(ticket);
    res.status(200).json({ updated: true });
}))

export default router;