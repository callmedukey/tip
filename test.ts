import prisma from "@/lib/prisma";

async function findRequest() {
  const request = await prisma.request.findUnique({
    where: {
      id: 17,
    },
    include: {
      user: true,
    },
  });

  console.log(request);
}

findRequest();
