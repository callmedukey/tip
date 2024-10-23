import { verifySession } from "@/actions/session";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const session = await verifySession();
    if (!session || session.accountType !== "Admin") {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const requests = await prisma.request.findMany({
      where: {
        status: {
          not: "pending",
        },
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            id: true,
            moneySpent: true,
          },
        },
      },
    });

    return Response.json(requests);
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
