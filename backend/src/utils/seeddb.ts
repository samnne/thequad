import { prisma } from "../db/db.ts";

const firstNames = ["Sam", "Alex", "Jordan", "Taylor", "Chris", "Jamie", "Morgan", "Riley"];
const lastNames = ["Smith", "Nguyen", "Patel", "Brown", "Garcia", "Lee", "Wilson", "Ahmed"];

function randomItem(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomEmail() {
  const first = randomItem(firstNames).toLowerCase();
  const last = randomItem(lastNames).toLowerCase();
  const num = Math.floor(Math.random() * 1000);
  return `${first}.${last}${num}@uvic.ca`;
}

async function main() {
  const users = Array.from({ length: 20 }).map(() => ({
    email: randomEmail(),
    passwordHash: "hashedpassword",
    name: `${randomItem(firstNames)} ${randomItem(lastNames)}`,
    profileURL: "https://picsum.photos/200",
    isVerified: Math.random() > 0.5
  }));

  await prisma.user.createMany({
    data: users,
    skipDuplicates: true
  });

  console.log("Seeded users with @uvic.ca emails 🌱");
}

main()
  .catch(e => {
    console.error(e);
   
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
