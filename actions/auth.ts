"use server";

import bcrypt from "bcrypt";
import {
  loginSchema,
  changePasswordSchema,
  signupSchema,
} from "@/definitions/auth";
import { createSession, decrypt, deleteSession } from "./session";
import { redirect } from "@/i18n/routing";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const getSession = async () => {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);
  return session;
};

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const validatedFields = loginSchema.safeParse({ email, password });
  if (!validatedFields.success) {
    return {
      error: "Please enter a valid email and password",
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      email: validatedFields.data.email,
    },
  });

  if (!user) {
    return {
      error: "Invalid email or password",
    };
  }
  const passwordMatch = await bcrypt.compare(
    validatedFields.data.password,
    user.password
  );

  if (!passwordMatch) {
    return {
      error: "Invalid email or password",
    };
  }

  await createSession({
    userId: user.id,
    accountType: user.accountType,
    name: user.name,
    accountLevel: user.userLevel,
  });

  return {
    userId: user.id,
    accountType: user.accountType,
    name: user.name,
    accountLevel: user.userLevel,
    success: "Login successfully",
  };
}

export async function signup({
  email,
  password,
  confirmPassword,
  name,
  phoneNumber,
  birthday,
  gender,
  accountType,
  businessNumber,
}: {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  phoneNumber: string;
  birthday: Date;
  gender: "Male" | "Female" | "Other";
  accountType: "Business" | "Leisure";
  businessNumber?: string;
}) {
  const validatedFields = signupSchema.safeParse({
    email,
    password,
    confirmPassword,
    name,
    phoneNumber,
    birthday,
    gender,
    accountType,
    businessNumber,
  });

  if (!validatedFields.success) {
    return {
      error: "Invalid Sign Up Input Submitted",
    };
  }

  const hashedPassword = await bcrypt.hash(validatedFields.data.password, 10);

  const existingUser = await prisma.user.findUnique({
    where: {
      email: validatedFields.data.email,
    },
  });

  if (existingUser) {
    return {
      error: "User with email already exists",
    };
  }

  const user = await prisma.user.create({
    data: {
      email: validatedFields.data.email,
      password: hashedPassword,
      name: validatedFields.data.name,
      phoneNumber: validatedFields.data!.phoneNumber as string,
      birthday: validatedFields.data.birthday as Date,
      gender: validatedFields.data.gender as string,
      accountType: validatedFields.data.accountType,
      extra: validatedFields.data.extra,
      businessNumber:
        validatedFields.data.accountType === "Business"
          ? validatedFields.data.businessNumber
          : null,
    },
  });

  if (!user) {
    return {
      error: "User Sign up failed",
    };
  }

  return {
    message: "User Sign up successfully",
  };
}

export async function logout() {
  deleteSession();
  revalidatePath("/");
  redirect("/");
}

export async function changePassword({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) {
  const validatedFields = changePasswordSchema.safeParse({
    password,
    confirmPassword,
  });
  if (!validatedFields.success) {
    return {
      message: "Please enter a valid password",
    };
  }

  const user = await prisma.user.findFirst({});
  if (!user) {
    return {
      message: "User not found",
    };
  }

  const hashedPassword = await bcrypt.hash(validatedFields.data.password, 10);

  const updatedUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  if (!updatedUser) {
    return {
      message: "User update failed",
    };
  }

  return {
    message: "Password changed successfully",
  };
}
