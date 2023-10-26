import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function createUser() {
    await prisma.file.deleteMany({});
    await prisma.ticket.deleteMany({});
    await prisma.user.deleteMany({});
    const password = '1234';
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    try {

        const user = await prisma.user.create({
            data: {
                email: 'elsa@prisma.io',
                username: 'test',
                password: hash,
            },
        });


        const tickets = await prisma.ticket.create({
            data:
            {
                title: "Test",
                text: "lol",
                authorId: user.id,
                file: {
                    create: {
                        file_name: "test.pdf",
                        url: "www.test.com"
                    }
                },
            },


        });

        console.log("User created:", user);
        console.log("Tickets created:", tickets);
    } catch (e) {
        console.error(e.message);
    } finally {
        await prisma.$disconnect();
    }
}

createUser();