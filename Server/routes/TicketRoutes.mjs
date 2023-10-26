import express from "express";
import catchAsync from "../utils/catchAsync.mjs";
import { PrismaClient } from "@prisma/client";
import multer from 'multer'

const router = express.Router();

router.post('/')