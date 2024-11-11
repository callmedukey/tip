"use server";
import { revalidatePath } from "next/cache";
import { verifySession } from "./session";
import prisma from "@/lib/prisma";

export const initFormWithSession = async () => {
  const session = await verifySession();
  return;
};

export const submitRequest = async (data: any) => {
  try {
    const session = await verifySession();

  if (!session || !session.userId) {
    return { error: "You must be logged in to submit a request" };
  }

  const user = await prisma.user.findUnique({
    where: {
      id: data?.userId && data.userId !== session.userId ? data.userId : session.userId,
    },
  });

  if (!user) {
    return { error: "User not found" };
  }
let couponId;
  if (data.code) {
    const coupon = await prisma.coupon.findUnique({
      where: {
        code: data.code.trim().toUpperCase(),
        active: true,
      },
    });

    if (!coupon) {
      return { error: "Invalid coupon code" };
    }

    couponId = coupon.id;
  }

  const request = await prisma.request
    .create({
      data: {
        ...data,
        code: undefined,
        couponId: data.code ? couponId : undefined,
        userId: user.id,

      },
    })
    .catch((error) => {
      console.log(error);
      return { error: "Failed to create request" };
    });

  if (!request) {
    return { error: "Failed to create request" };
  }

  revalidatePath("/[locale]/admin/new-request", "page");

    return { success: "Request created successfully" };
  } catch (error) {
    console.log(error);
    return { error: "Failed to create request" };
  }
  
};
