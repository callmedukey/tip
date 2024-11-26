import { verifySession } from "@/actions/session";
import prisma from "@/lib/prisma";
import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const session = await verifySession();

    if (!session || !session.userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const histories = await prisma.request.findMany({
      where: {
        userId: session?.userId,
        canceled: false,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json(histories);
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Server Side Error" }, { status: 500 });
  }
}
