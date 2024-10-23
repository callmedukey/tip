"use server";
import { revalidatePath } from "next/cache";
import { verifySession } from "./session";
import prisma from "@/lib/prisma";

export const initFormWithSession = async () => {
  const session = await verifySession();
  return;
};

export const submitRequest = async (data: any) => {
  const session = await verifySession();

  if (!session || !session.userId) {
    return { error: "You must be logged in to submit a request" };
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.userId,
    },
  });

  if (!user) {
    return { error: "User not found" };
  }

  const request = await prisma.request
    .create({
      data: {
        ...data,
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
};
