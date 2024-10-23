import { verifySession } from "@/actions/session";
import prisma from "@/lib/prisma";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
    try {
        const session = await verifySession()

    if (!session || !session.userId || session.accountType !== "Admin") {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const users = await prisma.user.findMany({
        where: {},
        select: {
          name: true,
          id: true,
          email: true,
          moneySpent: true,
          userLevel: true,
          gender: true,
          birthday: true,
        },
        orderBy: { createdAt: "desc" },
    });

    return Response.json(users);
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
