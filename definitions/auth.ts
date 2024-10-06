import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20),
});

export const signupSchema = loginSchema
  .extend({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters" })
      .trim(),
    businessNumber: z.string().trim().optional(),
    phoneNumber: z
      .string({ message: "Please enter a valid phone number" })
      .min(5, { message: "Please enter a valid phone number" })
      .optional(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(20, { message: "Password must be at most 20 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(20, { message: "Password must be at most 20 characters" }),
    birthday: z.date({ message: "Please enter a valid date" }).optional(),
    gender: z
      .enum(["Male", "Female", "Other"], {
        message: "Please select a valid gender",
      })
      .optional(),
    extra: z.string().trim().optional(),
    accountType: z.enum(["Business", "Leisure"], {
      message: "Please select a valid account type",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const changePasswordSchema = z
  .object({
    password: z.string().min(8).max(20),
    confirmPassword: z.string().min(8).max(20),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
