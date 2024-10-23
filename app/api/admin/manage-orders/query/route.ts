import prisma from "@/lib/prisma";
import { verifySession } from "@/actions/session";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const session = await verifySession();
    if (!session || session.accountType !== "Admin") {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const queryType = searchParams.get("queryType");
    const query = decodeURIComponent(searchParams.get("query") || "");

    const requests = await prisma.request.findMany({
        where: {
        status: {
          not: "pending",
        },
        user: {
            email: queryType === "email" ? { contains: query, mode: "insensitive" } : undefined,
          name: queryType === "name" ? { contains: query, mode: "insensitive" } : undefined,
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
