import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function updateTickets() {
    await prisma.ticket.updateMany({
        where: {
            aproved: true,
            inProgress: true
        },
        data: {
            inProgress: false
        }
    });

}

updateTickets();