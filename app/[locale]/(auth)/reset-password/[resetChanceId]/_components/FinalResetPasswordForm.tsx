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
import { useForm } from "react-hook-form";
import { useLocale, useTranslations } from "next-intl";
import { finalResetPasswordSchema } from "@/definitions/zod";
import { resetPassword } from "@/actions/auth";
import { useRouter } from "@/i18n/routing";

const FinalResetPasswordForm = ({
  resetChanceId,
}: {
  resetChanceId: string;
}) => {
  const t = useTranslations("resetPasswordChance");
  const router = useRouter();
  const form = useForm<z.infer<typeof finalResetPasswordSchema>>({
    resolver: zodResolver(finalResetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof finalResetPasswordSchema>) => {
    const response = await resetPassword({
      password: data.password,
      confirmPassword: data.confirmPassword,
      resetChanceId: resetChanceId,
    });

    if (response.success) {
      alert(t("passwordResetSuccess"));
      router.replace("/login");
    }

    if (response.message) {
      alert(response.message);
    }
  };

  return (
    <Form {...form}>
      <form
        className="bg-transparent max-w-xl mx-auto mt-24 px-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center relative">
              <label htmlFor={field.name} className="sr-only">
                {t("enterNewPassword")}
              </label>
              <FormControl>
                <input
                  type="password"
                  className="bg-transparent placeholder:text-formText pb-4 border-b-[0.5px] border-formText text-formText appearance-none focus:outline-none w-full text-base"
                  placeholder={t("enterNewPassword") + "*"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center relative">
              <label htmlFor={field.name} className="sr-only">
                {t("confirmNewPassword")}
              </label>
              <FormControl>
                <input
                  type="password"
                  className="bg-transparent placeholder:text-formText pb-4 border-b-[0.5px] border-formText text-formText appearance-none focus:outline-none w-full text-base"
                  placeholder={t("confirmNewPassword") + "*"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <button className="sm:py-6 py-4 px-24 bg-egyptianBlue text-white rounded-full mt-24 mx-auto flex items-center justify-center">
          {t("submit")}
        </button>
      </form>
    </Form>
  );
};

export default FinalResetPasswordForm;
