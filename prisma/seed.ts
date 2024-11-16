import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function main() {
  // const user = await prisma.user.findFirst({
  //   where: {
  //     accountType: "Admin",
  //   },
  // });
  // if (user) {
  //   console.log("Admin already exists");
  //   return;
  // }
  // await prisma.user.create({
  //   data: {
  //     accountType: "Admin",
  //     email: "admin@tip.com",
  //     name: "Tip Admin",
  //     phoneNumber: "010-1234-5678",
  //     birthday: new Date("1990-01-01"),
  //     gender: "Female",
  //     password: await bcrypt.hash("admin2024@@", 10),
  //   },
  // });
  await prisma.request.delete({
    where: {
      id: 10,
    },
  });
}

main()
  .then(async () => {
    console.log("Seeded");
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
