"use server";

import { randomUUID } from "crypto";
import { verifySession } from "./session";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { logout } from "./auth";
import { emailTemplate, staffEmailTemplate } from "@/lib/brevo";
import { sendEmailInstance } from "@/lib/brevo";
import { getLocale } from "next-intl/server";
export const generateSharedLink = async (requestId: string) => {
  try {
    const session = await verifySession();

    if (!session || !session.userId) return { message: "Unauthorized" };

    const existingSharedLink = await prisma.request.findUnique({
      where: { id: +requestId },
    });

    if (existingSharedLink?.sharedLink)
      return { success: true, sharedLink: existingSharedLink.sharedLink };

    const updatedRequest = await prisma.request.update({
      where: { id: +requestId },
      data: { sharedLink: randomUUID() },
    });
    if (!updatedRequest) return { message: "Error updating request" };

    return { success: true, sharedLink: updatedRequest.sharedLink };
  } catch (error) {
    console.error(error);
    return { message: "Failed to generate shared link" };
  }
};

export const disableSharedLink = async (requestId: string) => {
  try {
    const session = await verifySession();

    if (!session || !session.userId) return { message: "Unauthorized" };

    const existingSharedLink = await prisma.request.findUnique({
      where: { id: +requestId },
    });

    if (!existingSharedLink?.sharedLink)
      return { message: "Shared link is already disabled" };

    const updatedRequest = await prisma.request.update({
      where: { id: +requestId },
      data: { sharedLink: null },
    });

    if (!updatedRequest) return { message: "Error updating request" };

    return { message: "Shared link disabled successfully" };
  } catch (error) {
    console.error(error);
    return { message: "Failed to disable shared link" };
  }
};

export const createEditRequest = async ({
  requestId,
  content,
}: {
  requestId: number;
  content: string;
}) => {
  try {
    const session = await verifySession();
    const locale = await getLocale();
    if (!session || !session.userId) return { message: "Unauthorized" };

    const [created, updatedRequest] = await prisma.$transaction([
      prisma.editRequest.create({
        data: {
          content,
          requestId: +requestId,
          editRequestType: "normal",
        },
        
      }),
      prisma.request.update({
        where: { id: +requestId },
        data: { status: "initialEditing" },
        include:{
          user:{
            select:{
              name: true,
            }
          }
        }
      }),
    ]);

    // For Staff 
  sendEmailInstance({
    params: { name: updatedRequest.user.name, orderNumber: updatedRequest.id.toString()},
    emailTemplate:
staffEmailTemplate.requestSubmitted,
    to: "travelmate@travelinyourpocket.com",
  }).then((data) => {
    console.log("Sign up email sent to staff successfully");
  }).catch((error) => {
    console.log(error);
  });

    if (!created || !updatedRequest)
      return { message: "Failed to create edit request" };
    return { message: "Edit request created successfully" };
  } catch (error) {
    console.error(error);
    return { message: "Failed to create edit request" };
  }
};

export const cancelTrip = async (requestId: number, isPaid: boolean) => {
  try {
    const session = await verifySession();

    if (!session || !session.userId) return { message: "Unauthorized" };

    let updatedRequest;
    if (isPaid) {
      updatedRequest = await prisma.request.update({
        where: { id: +requestId, userId: session.userId },
        data: {  status: "canceled" },
      });
    } else {
      updatedRequest = await prisma.request.update({
        where: { id: +requestId, userId: session.userId, paid: false },
        data: { canceled: true, status: "canceled" },
      });
    }

    if (!updatedRequest) return { message: "Error canceling trip" };

    return { success: true };
  } catch (error) {
    console.error(error);
    return { message: "Failed to cancel trip" };
  }
};

export const confirmTrip = async (requestId: number) => {
  try {
    const session = await verifySession();

    if (!session || !session.userId) return { message: "Unauthorized" };

    const updatedRequest = await prisma.request.update({
      where: { id: +requestId, userId: session.userId, paid: false },
      data: { status: "confirmed" },
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    if (!updatedRequest) return { message: "Error confirming trip" };

    const locale = await getLocale();
    sendEmailInstance({
      params: {
      },
      emailTemplate:
        locale === "ko" ? emailTemplate.requestConfirmedKO : emailTemplate.requestConfirmed,
      to: updatedRequest.user.email,
    });
    return { success: true };
  } catch (error) {
    console.error(error);
    return { message: "Failed to confirm trip" };
  }
};

export const submitEmergencyRequest = async (
  requestId: number,
  content: string
) => {
  try {
    const session = await verifySession();

    if (!session || !session.userId) return { message: "Unauthorized" };

    const [created, updatedRequest] = await prisma.$transaction([
      prisma.editRequest.create({
        data: {
          content,
          requestId: +requestId,
          editRequestType: "normal",
        },
      }),
      prisma.request.update({
        where: { id: +requestId },
        data: { status: "editing" },
        include:{
          user:{
            select:{
              name: true,
            }
          }
        }
      }),
    ]);

    if (!created || !updatedRequest)
      return { message: "Failed to create edit request" };

    sendEmailInstance({
      params: { name: updatedRequest.user.name, orderNumber: updatedRequest.id.toString()},
      emailTemplate:
  staffEmailTemplate.requestSubmitted,
      to: "travelmate@travelinyourpocket.com",
    }).then((data) => {
      console.log("Sign up email sent to staff successfully");
    }).catch((error) => {
      console.log(error);
    });
  

    return { message: "Edit request created successfully" };
  } catch (error) {
    console.error(error);
    return { message: "Failed to create edit request" };
  }
};

export const updateUserProfile = async (data: any) => {
  try {
    const session = await verifySession();

    if (!session || !session.userId) return { message: "Unauthorized" };

    if (data.password !== data.confirmPassword) {
      return { message: "Passwords do not match" };
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const updatedUser = await prisma.user.update({
      where: { id: session.userId },
      data: {
        name: data.name,
        phoneNumber: data.phoneNumber,
        birthday: data.birthday,
        gender: data.gender,
        extra: data.extra,
        accountType: data.accountType,
        businessNumber: data.businessNumber,
        password: hashedPassword,
      },
    });

    if (!updatedUser) return { message: "Error updating user profile" };

    return { success: true };
  } catch (error) {
    console.error(error);
    return { message: "Failed to update user profile" };
  }
};
