"use client";
import { z } from "zod";
import { Datepicker } from "flowbite-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signupSchema } from "@/definitions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import { signup } from "@/actions/auth";
import { useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import PasswordInput from "../PasswordInput";
import { Checkbox } from "../ui/checkbox";
const SignupForm = () => {
  const t = useTranslations("signUpPage");
  const router = useRouter();
  const locale = useLocale();

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      businessNumber: "",
      password: "",
      confirmPassword: "",
      name: "",
      phoneNumber: "",
      birthday: null as unknown as Date,
      gender: "" as "Male" | "Female" | "Other",
      accountType: "Leisure",
      newsletter: true,
      referrer: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signupSchema>) => {
    if (data.phoneNumber === "") {
      return alert("Please enter a valid phone number");
    }

    if (!data.gender) {
      return alert("Please select a gender");
    }

    if (data.birthday === null) {
      return alert("Please enter a valid birth date");
    }

    if (data.accountType === "Business" && !data.businessNumber) {
      return alert("Please enter a valid business number");
    }

    if (data.accountType !== "Business" && data.businessNumber) {
      data.businessNumber = "";
    }

    const response = await signup(data as any);

    if (response?.error) {
      alert(response?.error);
    }

    if (response?.message) {
      alert(response?.message);
      router.replace("/login");
    }
  };

  const onAccountTypeClick = (accountType: "Business" | "Leisure") => {
    form.setValue("accountType", accountType);
  };
  const onGenderClick = (gender: "Male" | "Female" | "Other") => {
    form.setValue("gender", gender);
  };
  form.watch("accountType");
  form.watch("birthday");
  form.watch("gender");
  return (
    <Form {...form}>
      <form
        className="bg-transparent max-w-xl mx-auto mt-12 px-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <button
            className={cn(
              "w-full bg-white text-[0.75rem]/[100%] py-4",
              form.getValues("accountType") === "Business" &&
                "bg-[#173881] text-white"
            )}
            type="button"
            onClick={() => onAccountTypeClick("Business")}
          >
            {t("business")}
          </button>
          <button
            className={cn(
              "w-full bg-white text-[0.75rem]/[100%] py-4",
              form.getValues("accountType") === "Leisure" &&
                "bg-[#173881] text-white"
            )}
            type="button"
            onClick={() => onAccountTypeClick("Leisure")}
          >
            {t("leisure")}
          </button>
        </div>
        <fieldset className="flex flex-col gap-12 mt-16">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center relative">
                <label htmlFor={field.name} className="sr-only">
                  {t("name")}
                </label>
                <FormControl>
                  <input
                    className="bg-transparent placeholder:text-formText pb-4 border-b-[0.5px] border-formText text-formText appearance-none focus:outline-none w-full text-base"
                    placeholder={t("name")}
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
                  {t("email")}
                </label>
                <FormControl>
                  <input
                    className="bg-transparent placeholder:text-formText pb-4 border-b-[0.5px] border-formText text-formText appearance-none focus:outline-none w-full text-base"
                    placeholder={t("email")}
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
                  {t("phoneNumber")}
                </label>
                <FormControl>
                  <input
                    className="bg-transparent placeholder:text-formText pb-4 border-b-[0.5px] border-formText text-formText appearance-none focus:outline-none w-full text-base"
                    placeholder={t("phoneNumber")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Datepicker
            placeholder={t("dob")}
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
                    {t("businessNumber")}
                  </label>
                  <FormControl>
                    <input
                      className="bg-transparent placeholder:text-formText pb-4 border-b-[0.5px] border-formText text-formText appearance-none focus:outline-none w-full text-base"
                      placeholder={t("businessNumber")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <div className="flex gap-6 items-center">
            <span>{t("gender")}</span>
            <button
              type="button"
              className={cn(
                "text-[0.75rem]",
                form.getValues("gender") === "Male" && "underline font-bold"
              )}
              onClick={() => onGenderClick("Male")}
            >
              {t("male")}
            </button>
            <button
              type="button"
              className={cn(
                "text-[0.75rem]",
                form.getValues("gender") === "Female" && "underline font-bold"
              )}
              onClick={() => onGenderClick("Female")}
            >
              {t("female")}
            </button>
            <button
              type="button"
              className={cn(
                "text-[0.75rem]",
                form.getValues("gender") === "Other" && "underline font-bold"
              )}
              onClick={() => onGenderClick("Other")}
            >
              {t("other")}
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
          <FormField
            control={form.control}
            name="referrer"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center relative">
                <label htmlFor={field.name} className="sr-only">
                  {t("referrer")}
                </label>
                <FormControl>
                  <input
                    type="email"
                    className="bg-transparent placeholder:text-formText pb-4 border-b-[0.5px] border-formText text-formText appearance-none focus:outline-none w-full text-base"
                    placeholder={t("referrer")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newsletter"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 ">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1">
                  <FormLabel className="text-formText">
                    I agree to receive newsletters
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
          <button className="py-4 sm:py-6 px-24 bg-egyptianBlue text-white rounded-full mx-auto flex items-center justify-center">
            {t("submit")}
          </button>
          <p className="text-center text-base">
            {t("alreadyHaveAccount")}{" "}
            <Link href="/login" className="underline underline-offset-4">
              {t("login")}
            </Link>
          </p>
        </fieldset>
      </form>
    </Form>
  );
};

export default SignupForm;
