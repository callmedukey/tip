import { verifySession } from "@/actions/session";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
export async function GET(req: Request) {
    try {
        const session = await verifySession();
        if (!session || !session.userId || session.accountType !== "Admin") {
            return Response.json({ message: "Unauthorized" }, { status: 401 });
        }

    const { searchParams } = new URL(req.url);
    const queryType = searchParams.get("queryType");
    const query = searchParams.get("query");

    if (!queryType || !query) {
      return Response.json(
        { message: "Query type and query are required" },
        { status: 400 }
      );
    }
    console.log(queryType, query);

    const requests = await prisma.request.findMany({
        where: {
            status: {
              in: ["editing", "initialEditing", "canceled", "confirmed"],
            },
            canceled: false,
            user:{
                    email: queryType === "email" ? { contains: query, mode: "insensitive" } : undefined,
                    name: queryType === "name" ? { contains: query, mode: "insensitive" } : undefined,
            }
          },
          include: {
            user: {
              omit: {
                password: true,
              },
            },
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    console.log(requests);
    return Response.json(requests);
    } catch (error) {
        console.error(error);
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
