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
import generateCode from "@/lib/generateCode";
import {  addToContactList, emailTemplate, sendEmailInstance, staffEmailTemplate } from "@/lib/brevo";
import { getLocale } from "next-intl/server";

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
  referrer,
  newsletter,
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
  referrer?: string;
  newsletter?: boolean;
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
    referrer,
    newsletter,
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
      newsletter: validatedFields.data.newsletter ? true : false,
      referrer: validatedFields.data.referrer,
    },
  });

  if (!user) {
    return {
      error: "User Sign up failed",
    };
  }
  const locale = await getLocale();
// // For Staff 
//   sendEmailInstance({
//     params: { name: validatedFields.data.name,},
//     emailTemplate:
// staffEmailTemplate.welcome,
//     to: "travelmate@travelinyourpocket.com",
//   }).then((data) => {
//     console.log("Sign up email sent to staff successfully");
//   }).catch((error) => {
//     console.log(error);
//   });

//   sendEmailInstance({
//     params: { name: validatedFields.data.name, email: validatedFields.data.email, registrationDate: new Date().toLocaleDateString(locale=== "ko"? "ko-KR": "en-US", { year: 'numeric', month: 'long', day: 'numeric' }) },
//     emailTemplate:
//       locale === "ko" ? emailTemplate.welcomeKO : emailTemplate.welcome,
//     to: email,
//   }).then((data) => {
//     console.log("Sign up email sent to " + email + " successfully");
//   }).catch((error) => {
//     console.log(error);
//   });
if (validatedFields.data.referrer) {
  addToContactList({email: validatedFields.data.referrer, name: validatedFields.data.name}).then((data) => {
    console.log("Contact added to list", data);
  }).catch((error) => {
    console.log(error);
  });
}

  const sendEmails = await Promise.all([
    sendEmailInstance({
      params: { name: validatedFields.data.name, email: validatedFields.data.email, registrationDate: new Date().toLocaleDateString(locale=== "ko"? "ko-KR": "en-US", { year: 'numeric', month: 'long', day: 'numeric' }) },
      emailTemplate:
        locale === "ko" ? emailTemplate.welcomeKO : emailTemplate.welcome,
      to: email,
    }),
    sendEmailInstance({
      params: { name: validatedFields.data.name,},
      emailTemplate:
staffEmailTemplate.welcome,
      to: "travelmate@travelinyourpocket.com",
    })
  ]).catch((error) => {
    console.log(error);
  });

  


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

export const generateResetPasswordCode = async ({email, locale}: {email: string, locale: string}) => {
  try {
    const passcode = generateCode();

    const existingUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!existingUser) {
      return {
        existingUser: true,
      };
    }

    const updatedUser = await prisma.user.update({
      where: {
        email,
      },
      data: {
        passcode,
      },
    });


    if (!updatedUser) {
      return {
        message: "Failed to generate reset password code",
      };
    }

    sendEmailInstance({
      params: { passcode },
      emailTemplate: locale === "ko" ? emailTemplate.resetPasswordKO : emailTemplate.resetPassword,
      to: email,
    }).then((data) => {
      console.log(data);
      console.log(`Email sent to ${email} successfully`);
    }).catch((error) => {
      console.log(error);
    });

    

    return {
      success: true,
    };

  } catch (error) {
    console.log(error);
    return {
      message: "Failed to generate reset password code",
    };
  }
};

export const resetPassword = async ({ password, confirmPassword, resetChanceId }: {password: string, confirmPassword: string, resetChanceId: string}) => {
try {
  if (!password || !confirmPassword) {
    return {
      message: "Please enter a password",
    };
  }

  if (password !== confirmPassword) {
    return {
      message: "Passwords do not match",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const resetChance = await prisma.resetChance.findUnique({
    where: {
      id: resetChanceId,
    },
    include: {
      user: true,
    },
  });

  if (!resetChance) {
    return {
      message: "Invalid Request",
    };
  }

   const updatedUser = await prisma.user.update({
    where: {
      id: resetChance.user.id,
    },
    data: {
      password: hashedPassword,
      resetChance: {
        delete: true
      },
    },
  });

  if (!updatedUser) {
    return {
      message: "Failed to reset password",
    };

  }
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Failed to reset password",
    };
  }
};


export const verifyResetPasswordCode = async ({passcode}: { passcode: string}) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        passcode,
      } ,
      include:{
        resetChance: true,
      },
      omit:{
        password:true,
      }
    });
    if (!user) {
      return {
        message: "Invalid passcode",
      };
    }

    if (user.resetChance) {
      await prisma.$transaction([
        prisma.resetChance.delete({
          where: {
            id: user.resetChance.id,
          },
        }),
        prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            passcode: null,
          },
        }),
      ]);

      return {
        message: "Reset password code already used",
      };

    }


    const createChance = await prisma.resetChance.create({
      data: {
        userId: user.id,
      },
    });


    if (!createChance) {
      return {
        message: "Failed to create reset password chance",
      };
    }
    return {
      success: true,
      resetId: createChance.id,
    };

  } catch (error) {
    console.log(error);
    return {
      message: "Failed to verify reset password code",
    };
  }
};
