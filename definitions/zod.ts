import { z } from "zod";

export const ContactFormSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z.string().min(1, { message: "Phone number is required" }),
  where: z.string().min(1, { message: "Where is required" }),
  when: z.string().min(1, { message: "When is required" }),
  budget: z.string().min(1, { message: "Budget is required" }),
  how: z.string().optional(),
  areThereAnyQuestions: z.string().optional(),
});

export const MainPageFormSchema = z.object({
  city: z.array(z.string()),
  adults: z.coerce.number().min(0),
  infants: z.coerce.number().min(0),
  purpose: z.string().min(1, { message: "Purpose is required" }),
});

export const FinalFormSchema = z.object({
  options: z.array(z.string()),
  extra: z.string().optional(),
  code: z.string().optional(),
  budget: z.string().optional(),
});

export const RequestFormSchema = z.object({
  city: z.string().min(1, { message: "City is required" }),
  from: z.date().nullable(),
  to: z.date().nullable(),
  adults: z.coerce.number().min(0),
  infants: z.coerce.number().min(0),
  purpose: z.string().min(1, { message: "Purpose is required" }),
  options: z.array(z.string()),
  extra: z.string().optional(),
  packageType: z.enum(["all-inclusive", "custom"]),
});

export const TravelSummaryFormItemSchema = z.object({
  label: z.string().min(1, { message: "라벨은 필수입니다." }).trim(),
  value: z.string().min(1, { message: "값은 필수입니다." }).trim(),
});

export const TravelSummaryFormSchema = z.object({
  json: z
    .array(TravelSummaryFormItemSchema)
    .min(1, { message: "비어있습니다." }),
});

export const TravelPlanFormSchema = z.object({
  json: z
    .array(
      z.object({
        date: z.date({ message: "날짜는 필수입니다." }),
        day: z.string({ message: "요일은 필수입니다." }).trim(),
        time: z.string({ message: "시간은 필수입니다." }).trim(),
        placeName: z
          .string({ message: "장소명은 필수입니다." })
          .min(1, { message: "장소명은 필수입니다." })
          .trim(),
        longitude: z
          .string({ message: "경도는 필수입니다." })
          .min(1, { message: "경도는 필수입니다." })
          .trim(),
        latitude: z
          .string({ message: "위도는 필수입니다." })
          .min(1, { message: "위도는 필수입니다." })
          .trim(),
      })
    )
    .min(1, { message: "비어있습니다." }),
});

export const AdminQuoteFormSchema = z.object({
  price: z.coerce.number().min(0),
  currency: z.string().min(1, { message: "통화는 필수입니다." }).max(3, {
    message: "통화는 3자 이하여야 합니다.",
  }),
  link: z.string({ message: "링크는 필수입니다." }),
});

export const CouponSchema = z.object({
  code: z
    .string()
    .min(1, { message: "코드는 필수입니다." })
    .trim()
    .toUpperCase(),
  description: z
    .string()
    .min(1, { message: "설명은 필수입니다." })
    .trim()
    .toUpperCase(),
});

export const AdminFileUploadsSchema = z.object({
  file: z.any(),
  title: z.string().min(1, { message: "파일명은 필수입니다." }).trim(),
  requestId: z.coerce.number().min(1, { message: "요청 ID는 필수입니다." }),
});

export const finalResetPasswordSchema = z
  .object({
    password: z.string().min(1, { message: "This field is required." }),
    confirmPassword: z.string().min(1, { message: "This field is required." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
