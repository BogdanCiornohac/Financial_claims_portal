import { PrismaClient } from "@prisma/client";
import ExpressError from "../utils/ExpressError.mjs";
const prisma = new PrismaClient();

export default async function isLoggedInParams(req, res, next) {
    const { userId } = req.params;
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })
    res.locals.user = user;
    if (!user) {
        next(new ExpressError("Invalid id", 404));
    }
    next()
}