"use client";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@/definitions/auth";
import { useForm } from "react-hook-form";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { generateResetPasswordCode } from "@/actions/auth";
import ResetPasswordPartTwoForm from "./ResetPasswordPartTwoForm";

const ResetPasswordForm = () => {
  const t = useTranslations("resetPassword");
  const locale = useLocale();
  const [isCodeSent, setIsCodeSent] = useState(false);

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof resetPasswordSchema>) => {
    const { existingUser, message, success } = await generateResetPasswordCode({
      email: data.email,
      locale,
    });

    if (existingUser) {
      alert(t("userNotFound"));
      return;
    }

    if (message) {
      alert(message);
      return;
    }

    if (success) {
      alert(t("success"));
      setIsCodeSent(true);
    }
  };

  const handleSendCode = async () => {
    setIsCodeSent(!isCodeSent);
  };

  if (isCodeSent) {
    return <ResetPasswordPartTwoForm handleSendCode={handleSendCode} />;
  }

  return (
    <Form {...form}>
      <form
        className="bg-transparent max-w-xl mx-auto mt-24 px-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
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
                  placeholder={t("email") + "*"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!isCodeSent && (
          <p className="text-left text-base mb-16">{t("weWillSendCode")}</p>
        )}

        <button className="sm:py-6 py-4 px-24 bg-egyptianBlue text-white rounded-full mt-24 mx-auto flex items-center justify-center">
          {t("sendCode")}
        </button>
        <p className="mt-24 text-center text-base">
          <button
            type="button"
            className="underline underline-offset-4"
            onClick={handleSendCode}
          >
            {t("alreadyCode")}
          </button>
        </p>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
