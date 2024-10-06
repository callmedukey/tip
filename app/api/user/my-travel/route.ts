import type { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { verifySession } from "@/actions/session";
import { formatDateToUTC } from "@/lib/time-formmater";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const session = await verifySession();

    if (!session || !session.userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const timezone = req.nextUrl.searchParams.get("tz") as string;
    const todayISO = req.nextUrl.searchParams.get("today") as string;

    if (!timezone || !todayISO) {
      return Response.json({ error: "Bad Request" }, { status: 400 });
    }

    const requests = await prisma.request.findMany({
      where: {
        userId: session?.userId,
        to: {
          gte: formatDateToUTC(new Date(todayISO)),
        },
        canceled: false,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return Response.json(requests);
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Server Side Error" }, { status: 500 });
  }
}
