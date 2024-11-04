"use client";
import type { User } from "@prisma/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/definitions/auth";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Datepicker } from "flowbite-react";
import { Textarea } from "@/components/ui/textarea";
import { updateUserProfile } from "@/actions/user";
import { useLocale, useTranslations } from "next-intl";
import PasswordInput from "@/components/PasswordInput";
const ProfileForm = ({ user }: { user: User }) => {
  const t = useTranslations("myProfile");
  const locale = useLocale();
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
      phoneNumber: user?.phoneNumber,
      birthday: user?.birthday,
      gender: user?.gender as "Male" | "Female" | "Other",
      extra: user?.extra ?? "",
      accountType: user?.accountType as "Business" | "Leisure",
      businessNumber: user?.businessNumber ?? "",
    },
  });
  const onSubmit = async (data: z.infer<typeof signupSchema>) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const response = await updateUserProfile(data);

    if (response?.message) {
      alert(response?.message);
    }

    if (response?.success) {
      alert("Profile updated successfully");
    }
  };

  const onGenderClick = (gender: "Male" | "Female" | "Other") => {
    form.setValue("gender", gender);
  };
  return (
    <Form {...form}>
      <form
        className="bg-transparent max-w-xl mx-auto mt-12 px-8 w-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <fieldset className="flex flex-col gap-12 mt-16">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center relative">
                <label htmlFor={field.name} className="sr-only">
                  name
                </label>
                <FormControl>
                  <input
                    className="bg-transparent placeholder:text-formText pb-4 border-b-[0.5px] border-formText text-formText appearance-none focus:outline-none w-full text-base"
                    placeholder="Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center relative">
                <label htmlFor={field.name} className="sr-only">
                  email
                </label>
                <FormControl>
                  <input
                    className="bg-transparent placeholder:text-formText pb-4 border-b-[0.5px] border-formText text-formText appearance-none focus:outline-none w-full text-base"
                    placeholder="E-mail"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <PasswordInput form={form} name="password" className="mt-0" />
          <PasswordInput form={form} name="confirmPassword" className="mt-0" />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center relative">
                <label htmlFor={field.name} className="sr-only">
                  phone number
                </label>
                <FormControl>
                  <input
                    className="bg-transparent placeholder:text-formText pb-4 border-b-[0.5px] border-formText text-formText appearance-none focus:outline-none w-full text-base"
                    placeholder="Phone Number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Datepicker
            placeholder="Date of birth"
            value={form.getValues("birthday") || null}
            onChange={(e) => form.setValue("birthday", e as Date)}
            className=""
            theme={{
              root: {
                base: "relative ",
                input: {
                  base: "bg-transparent",
                  field: {
                    base: "bg-transparent",
                    icon: {
                      base: "hidden",
                    },
                    input: {
                      base: "!bg-transparent !border-b-[0.5px] !placeholder-formText !border-formText !w-full !shadow-none !focus:ring-transparent !outline-0 !focus:outline-none !pl-0 !rounded-none !text-base",
                    },
                  },
                },
              },
            }}
          />
          {form.getValues("accountType") === "Business" && (
            <FormField
              control={form.control}
              name="businessNumber"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center relative">
                  <label htmlFor={field.name} className="sr-only">
                    business number
                  </label>
                  <FormControl>
                    <input
                      className="bg-transparent placeholder:text-formText pb-4 border-b-[0.5px] border-formText text-formText appearance-none focus:outline-none w-full text-base"
                      placeholder="Business Number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <div className="flex gap-6 items-center">
            <span>Gender</span>
            <button
              type="button"
              className={cn(
                "text-[0.75rem]",
                form.getValues("gender") === "Male" && "underline font-bold"
              )}
              onClick={() => onGenderClick("Male")}
            >
              Male
            </button>
            <button
              type="button"
              className={cn(
                "text-[0.75rem]",
                form.getValues("gender") === "Female" && "underline font-bold"
              )}
              onClick={() => onGenderClick("Female")}
            >
              Female
            </button>
            <button
              type="button"
              className={cn(
                "text-[0.75rem]",
                form.getValues("gender") === "Other" && "underline font-bold"
              )}
              onClick={() => onGenderClick("Other")}
            >
              Other
            </button>
          </div>
          <FormField
            control={form.control}
            name="extra"
            render={({ field }) => (
              <FormItem className="relative isolate flex flex-col items-start gap-2">
                <FormLabel
                  className={cn(
                    "absolute inset-0 flex items-center justify-center text-left text-[#A3A3A3] text-[0.75rem] left-4 sm:left-0 italic leading-[100%] font-normal opacity-80",
                    form.getValues("extra") && "sr-only"
                  )}
                >
                  {locale === "ko" ? (
                    <>
                      추가 정보를 알려주세요. <br /> {`예시)`} 저는 로컬 음식을
                      좋아하고 미술관을 방문하는 것을 좋아합니다.
                    </>
                  ) : (
                    <>
                      {" "}
                      Please tell us more about your{" "}
                      <br className="sm:hidden" /> preferances eg. I like to
                      <br />
                      experience local cuisine and visit{" "}
                      <br className="sm:hidden" /> art gallaries
                    </>
                  )}
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="border-none shadow-none bg-white rounded-[1rem] resize-none p-8"
                    rows={8}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <button className="py-4 sm:py-6 px-24 bg-egyptianBlue text-white rounded-full mx-auto flex items-center justify-center">
            {t("editProfile")}
          </button>
        </fieldset>
      </form>
    </Form>
  );
};

export default ProfileForm;
