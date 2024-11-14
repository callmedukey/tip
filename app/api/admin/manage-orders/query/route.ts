import prisma from "@/lib/prisma";
import { verifySession } from "@/actions/session";
import getDateComponents from "@/lib/getDateComponents";
import { reconstructDate } from "@/lib/getDateComponents";
import { DateTime } from "luxon";

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
    const fromDate = decodeURIComponent(searchParams.get("fromDate") || "");
    const toDate = decodeURIComponent(searchParams.get("toDate") || "");

    let queryFrom: string | undefined | null;
    let queryTo: string | undefined | null;

    if (queryType === "start" && fromDate) {
      queryFrom = DateTime.fromISO(fromDate).toUTC().toISO();
    }

    if (queryType === "start" && toDate) {
      queryTo = DateTime.fromISO(toDate).toUTC().toISO();
    }

    if (queryType === "start" && (!queryFrom || !queryTo)) {
      return Response.json({ message: "Invalid date range" }, { status: 400 });
    }

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
        from:
          queryFrom && queryTo
            ? { gte: new Date(queryFrom), lte: new Date(queryTo) }
            : undefined,
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
