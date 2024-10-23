import { verifySession } from "@/actions/session";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
    try {
        const session = await verifySession();

    if (!session || session.accountType !== "Admin" || !session.userId) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const requests = await prisma.request.findMany({
        where:{
        paid: true,
      },
      include: {
        user: {
          omit: {
            password: true,
          },
        },
      },
      orderBy: {
        paidAt: "desc",
      },
    });

    return Response.json(requests);
  } catch (error) {
    console.error(error);
        Response.json({message: "Server Error: Failed to get sales"})
    }
}

