export const dynamic = "force-dynamic";
import { verifySession } from "@/actions/session";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const session = await verifySession();
    if (!session || !session.userId || session.accountType !== "Admin") {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") || "";
    const queryType = searchParams.get("queryType");

    if (!queryType || !query) {
      return Response.json(
        { message: "Query type and query are required" },
        { status: 400 }
      );
    }

    const users = await prisma.user.findMany({
      where: {
        email:
          queryType === "email"
            ? { contains: query, mode: "insensitive" }
            : undefined,
        name:
          queryType === "name"
            ? { contains: query, mode: "insensitive" }
            : undefined,
      },
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
