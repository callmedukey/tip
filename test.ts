import prisma from "@/lib/prisma";

async function findRequest() {
  await prisma.request.update({
    where: {
      id: 17,
    },
    data: {
      canceled: false,
    },
  });
}

findRequest();
