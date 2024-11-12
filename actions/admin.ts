"use server";

import { SummaryArray, TravelPlanArray } from "@/definitions/request-details";
import prisma from "@/lib/prisma";
import { verifySession } from "./session";
import { revalidatePath } from "next/cache";
import { dateToUTC } from "@/lib/time-formmater";
import type { AccountType, UserLevel } from "@prisma/client";
import { emailTemplate, sendEmailInstance } from "@/lib/brevo";
import { getLocale } from "next-intl/server";

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

export const saveQuote = async ({requestId, price, currency, link}:{requestId:string, price:number, currency:string, link:string})=>{
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
        quoteLink: link,
        price: price,
        currency: currency,
      },
    });

    revalidatePath("/[locale]/admin/planner", "page");
    revalidatePath("/[locale]/admin/new-request", "page");
    revalidatePath("/[locale]/my-travel", "page");
    revalidatePath("/[locale]/admin/manage-orders", "page");
    revalidatePath("/[locale]/admin/update-request", "page");



    if (!updatedRequest) {
      return { error: "업데이트 오류입니다" };
    }

    
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "서버에서 업데이트 오류입니다" };
  }
}

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
        status: "invoiced",
        price: price,
        currency: currency,
        quoteLink: link,
      },
      include: {
        user: {
          select: {
            email: true,
          },
        },
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

    const locale = await getLocale();
   

    sendEmailInstance({
      params: {},
      emailTemplate:
        locale === "ko" ? emailTemplate.invoiceIssuedKO : emailTemplate.invoiceIssued,
      to: updatedRequest.user.email,
    }).then((data) => {
      console.log("Invoice issued email sent to " + updatedRequest.user.email + " successfully");
    }).catch((error) => {
      console.log(error);
    });
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
        status: "canceled",
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

export const togglePaid = async ({
  id,
  currentStatus,
}: {
  id: string;
  currentStatus: boolean;
}) => {
  try {
    const updatedRequest = await prisma.request.update({
      where: {
        id: +id,
      },
      data: {
        paid: !currentStatus,
        paidAt: !currentStatus == true ? dateToUTC(new Date()) : null,
        status: !currentStatus == true ? "paid" : undefined,
      },
      include:{
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    if (!updatedRequest) {
      return { message: "Error updating paid status" };
    }

    revalidatePath("/[locale]/admin/manage-orders", "page");

    const locale = await getLocale();
    if (updatedRequest.paid) {
      sendEmailInstance({
        params: {
        },
        emailTemplate:
          locale === "ko" ? emailTemplate.paymentSuccessKO : emailTemplate.paymentSuccess,
        to: updatedRequest.user.email,
      });
    }
    return { success: true };
  } catch (error) {
    console.log(error);
    return { message: "Server Error - Updating Paid Status" };
  }
};

export const sendRequestToCustomer = async ({
  requestId,
  paid,
}: {
  requestId: string;
  paid: boolean;
}) => {
  try {
    const session = await verifySession();
    if (!session || !session.userId || session.accountType !== "Admin") {
      return { error: "Unauthorized Access" };
    }

    const updatedRequest = await prisma.request.update({
      where: {
        id: +requestId,
      },
      data: {
        status: paid ? "confirmed" : "awaitingResponse",
      },
      include: {
        user: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    });
    if (!updatedRequest) {
      return { message: "Error updating request status" };
    }
    revalidatePath("/[locale]/admin/planner", "page");
    revalidatePath("/[locale]/admin/new-request", "page");
    revalidatePath("/[locale]/my-travel", "page");
    revalidatePath("/[locale]/admin/manage-orders", "page");
    revalidatePath("/[locale]/admin/update-request", "page");

    const locale = await getLocale();
    sendEmailInstance({
      params: {
        name: updatedRequest.user.name,
      },
      emailTemplate:
        locale === "ko" ? emailTemplate.requestEditedKO : emailTemplate.requestEdited,
      to: updatedRequest.user.email,
    }).then((data) => {
      console.log("Request confirmed email sent to " + updatedRequest.user.email + " successfully");
    }).catch((error) => {
      console.log(error);
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { message: "Server Error - Sending Request to Customer" };
  }
};

export const updateUserLevel = async ({
  userId,
  newLevel,
}: {
  userId: string;
  newLevel: UserLevel;
}) => {
  try {
    const session = await verifySession();
    if (!session || !session.userId || session.accountType !== "Admin") {
      return { error: "Unauthorized Access" };
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        userLevel: newLevel,
      },
    });

    if (!updatedUser) {
      return { message: "Error updating user level" };
    }

    revalidatePath("/[locale]/admin/manage-orders", "page");
    revalidatePath("/[locale]/admin/manage-users", "page");
    revalidatePath("/[locale]/admin/new-request", "page");

    const locale = await getLocale();
    sendEmailInstance({
      params: {
      },
      emailTemplate:
        locale === "ko" ? emailTemplate.accountLeveledUpKO : emailTemplate.accountLeveledUp,
      to: updatedUser.email,
    });
    return { success: true };
  } catch (error) {
    console.error(error);
    return { message: "Server Error - Updating User Level" };
  }
};

export const updateAccountType = async ({
  userId,
  newAccountType,
}: {
  userId: string;
  newAccountType: AccountType;
}) => {
  try {
    const session = await verifySession();
    if (!session || !session.userId || session.accountType !== "Admin") {
      return { error: "Unauthorized Access" };
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        accountType: newAccountType,
      },
    });

    if (!updatedUser) {
      return { message: "Error updating account type" };
    }

    revalidatePath("/[locale]/admin/manage-users/[userId]", "page");
    revalidatePath("/[locale]/admin/manage-users", "page");
    revalidatePath("/[locale]/admin/new-request", "page");
    revalidatePath("/[locale]/admin/update-request", "page");
    revalidatePath("/[locale]/admin/manage-orders", "page");

    return { success: true };
  } catch (error) {
    console.error(error);
    return { message: "Server Error - Updating Account Type" };
  }
};

export const toggleActiveCoupon = async ({
  couponId,
  active,
}: {
  couponId: string;
  active: boolean;
}) => {
  try {
    const session = await verifySession();
    if (!session || !session.userId || session.accountType !== "Admin") {
      return { error: "Unauthorized Access" };
    }

    const updatedCoupon = await prisma.coupon.update({
      where: {
        id: couponId,
      },
      data: {
        active: !active,
      },
    });

    if (!updatedCoupon) {
      return { message: "Error updating coupon active status" };
    }

    revalidatePath("/[locale]/admin/coupons", "page");

    return { success: true };
  } catch (error) {
    console.error(error);
    return { message: "Server Error - Toggling Coupon Active Status" };
  }
};

export const createCoupon = async ({
  code,
  description,
}: {
  code: string;
  description: string;
}) => {
  try {
    const session = await verifySession();
    if (!session || !session.userId || session.accountType !== "Admin") {
      return { error: "Unauthorized Access" };
    }

    const existingCoupon = await prisma.coupon.findUnique({
      where: {
        code,
      },
    });

    if (existingCoupon) {
      return { message: "Coupon already exists" };
    }

    const createdCoupon = await prisma.coupon.create({
      data: {
        code,
        description,
      },
    });
    if (!createdCoupon) {
      return { message: "Error creating coupon" };
    }
    revalidatePath("/[locale]/admin/coupons", "page");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { message: "Server Error - Creating Coupon" };
  }
};

export const updateRequestNote = async ({
  requestId,
  note,
}: {
  requestId: number;
  note: string;
}) => {
  try {
    const session = await verifySession();
    if (!session || !session.userId || session.accountType !== "Admin") {
      return { message: "Unauthorized Access" };
    }


    if (!note.trim() || !requestId){
      return {message:"Note cannot be empty"}
    }
    const updatedRequest = await prisma.request.update({
      where: {
        id: requestId,
      },
      data: {
        adminNotes: note.trim(),
      },
    });

    if (!updatedRequest) {
      return { message: "Error updating request note" };
    }
    revalidatePath("/[locale]/admin/planner", "page");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { message: "Server Error - Updating Request Note" };
  }
};
