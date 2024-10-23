import { verifySession } from "@/actions/session";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  try {
    const session = await verifySession();

    if (!session || session.accountType !== "Admin" || !session.userId) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const searchParams = new URL(req.url).searchParams;
    const queryType = searchParams.get("queryType");
    const query = decodeURIComponent(searchParams.get("query") || "");

    if (!queryType || !query) {
      return Response.json(
        { message: "Invalid query parameters" },
        { status: 400 }
      );
    }
    const requests = await prisma.request.findMany({
      where: {
        user: {
          email: queryType === "email" ? { contains: query, mode: "insensitive" } : undefined,
          name: queryType === "name" ? { contains: query, mode: "insensitive" } : undefined,
        },
        paid: true
      },
      include:{
        user:{
          omit: {
            password: true,
          }
        }
      },
      orderBy: {
        paidAt: "desc",
      },
    });

    return Response.json(requests);
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Server Error: Failed to get sales" },
      { status: 500 }
    );
  }
}
