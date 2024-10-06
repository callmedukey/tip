"use server";

import { SummaryArray, TravelPlanArray } from "@/definitions/request-details";
import prisma from "@/lib/prisma";
import { verifySession } from "./session";
import { revalidatePath } from "next/cache";

export const saveRequestSummary = async ({
  summary,
  requestId,
}: {
  requestId: string;
  summary: SummaryArray;
}) => {
  try {
    const session = await verifySession();

    if (!session || !session.userId || session.accountType !== "Admin") {
      return { error: "접근 권한이 없습니다" };
    }

    const updatedRequest = await prisma.request.update({
      where: {
        id: +requestId,
      },
      data: {
        summary: summary,
      },
    });

    if (!updatedRequest) {
      return { error: "업데이트 오류입니다" };
    }

    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "서버에서 업데이트 오류입니다" };
  }
};

export const saveTravelPlan = async ({
  travelPlan,
  requestId,
}: {
  requestId: string;
  travelPlan: TravelPlanArray;
}) => {
  try {
    const session = await verifySession();

    if (!session || !session.userId || session.accountType !== "Admin") {
      return { error: "접근 권한이 없습니다" };
    }

    const updatedRequest = await prisma.request.update({
      where: {
        id: +requestId,
      },
      data: {
        travelPlan: travelPlan,
      },
    });

    if (!updatedRequest) {
      return { error: "업데이트 오류입니다" };
    }

    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "서버에서 업데이트 오류입니다" };
  }
};

export const issueQuote = async ({
  requestId,
  price,
  currency,
  link,
}: {
  requestId: string;
  price: number;
  currency: string;
  link: string;
}) => {
  try {
    const session = await verifySession();

    if (!session || !session.userId || session.accountType !== "Admin") {
      return { error: "접근 권한이 없습니다" };
    }

    const updatedRequest = await prisma.request.update({
      where: {
        id: +requestId,
      },
      data: {
        price: price,
        currency: currency,
        quoteLink: link,
      },
    });

    if (!updatedRequest) {
      return { error: "업데이트 오류입니다" };
    }
    revalidatePath("/[locale]/admin/planner", "page");
    revalidatePath("/[locale]/admin/new-request", "page");
    revalidatePath("/[locale]/my-travel", "page");
    revalidatePath("/[locale]/admin/manage-orders", "page");
    revalidatePath("/[locale]/admin/update-request", "page");
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "서버에서 업데이트 오류입니다" };
  }
};

export const cancelRequest = async ({ requestId }: { requestId: string }) => {
  try {
    const session = await verifySession();
    if (!session || !session.userId || session.accountType !== "Admin") {
      return { error: "접근 권한이 없습니다" };
    }

    const updatedRequest = await prisma.request.update({
      where: {
        id: +requestId,
      },
      data: {
        canceled: true,
      },
    });

    if (!updatedRequest) {
      return { error: "업데이트 오류입니다" };
    }
    revalidatePath("/[locale]/admin/planner", "page");
    revalidatePath("/[locale]/admin/new-request", "page");
    revalidatePath("/[locale]/my-travel", "page");
    revalidatePath("/[locale]/admin/manage-orders", "page");
    revalidatePath("/[locale]/admin/update-request", "page");

    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "서버에서 업데이트 오류입니다" };
  }
};
