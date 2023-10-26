import express from "express";
import catchAsync from "../utils/catchAsync.mjs";
import { PrismaClient } from "@prisma/client";
import multer from 'multer'
import config from "../firebase.mjs";
import { initializeApp } from "firebase/app"
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
const router = express.Router();

initializeApp(config);


const storage = getStorage();


const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("file"), catchAsync(async (req, res) => {

    const storageRef = ref(storage, `tickets/${req.file.originalname}`);
    const metadata = {
        contentType: req.file.mimetype
    }

    const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log('File successfully uploaded.', downloadURL);
    res.send('Uploaded');
}));

export default router;