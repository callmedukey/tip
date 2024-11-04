import prisma from "@/lib/prisma";
import { verifySession } from "@/actions/session";
import getDateComponents from "@/lib/getDateComponents";
import { reconstructDate } from "@/lib/getDateComponents";

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
    const selectedMonth = decodeURIComponent(
      searchParams.get("selectedMonth") || ""
    );
    let queryFrom: string | undefined;
    let queryTo: string | undefined;
    if (queryType === "start" && selectedMonth) {
      const { year, month, firstDay, lastDay } = getDateComponents(
        new Date(selectedMonth)
      );
      queryFrom = reconstructDate({ year, month, day: firstDay }).toISOString();
    }
    console.log(queryFrom);
    const requests = await prisma.request.findMany({
      where: {
        status: {
          not: "pending",
        },
        user:
          queryType === "email" || queryType === "name"
            ? {
                email:
                  queryType === "email"
                    ? { contains: query, mode: "insensitive" }
                    : undefined,
                name:
                  queryType === "name"
                    ? { contains: query, mode: "insensitive" }
                    : undefined,
              }
            : undefined,
        from: queryFrom ? { gte: queryFrom } : undefined,
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
