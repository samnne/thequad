import { prisma } from "../db/db.ts";

const users = await prisma.user.findUnique({where: {email: "mashce@uvic.ca"}}).finally(async ()=> await prisma.$disconnect());

console.log(users);
