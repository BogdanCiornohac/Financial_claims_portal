import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function createUser() {
    const password = 'admin';
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    try {
        await prisma.user.delete({
            where: {
                username: 'admin'
            }
        });
        const user = await prisma.user.create({
            data: {
                email: 'admin@gmail.com',
                username: 'admin',
                password: hash,
                isAdmin: true
            },
        });

        console.log("User created:", user);
    } catch (e) {
        console.error(e.message);
    } finally {
        await prisma.$disconnect();
    }
}

createUser();