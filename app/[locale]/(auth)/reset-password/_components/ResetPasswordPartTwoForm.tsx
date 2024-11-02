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
import {
  resetPasswordCodeSchema,
  resetPasswordSchema,
} from "@/definitions/auth";
import { useForm } from "react-hook-form";
import { useLocale, useTranslations } from "next-intl";
import { verifyResetPasswordCode } from "@/actions/auth";
import { useRouter } from "@/i18n/routing";

const ResetPasswordPartTwoForm = ({
  handleSendCode,
}: {
  handleSendCode: () => void;
}) => {
  const t = useTranslations("resetPassword");
  const locale = useLocale();
  const router = useRouter();
  const secondForm = useForm<z.infer<typeof resetPasswordCodeSchema>>({
    resolver: zodResolver(resetPasswordCodeSchema),
    defaultValues: {
      passcode: "",
    },
  });

  const onSubmitSecondForm = async (
    data: z.infer<typeof resetPasswordCodeSchema>
  ) => {
    const response = await verifyResetPasswordCode({
      passcode: data.passcode,
    });
    if (response.message) {
      alert(response.message);
      return;
    }

    if (response.success && response.resetId) {
      router.push(`/reset-password/${response.resetId}`);
    }
  };

  return (
    <Form {...secondForm}>
      <form
        className="bg-transparent max-w-xl mx-auto mt-24 px-8"
        onSubmit={secondForm.handleSubmit(onSubmitSecondForm)}
      >
        <FormField
          control={secondForm.control}
          name="passcode"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center relative">
              <label htmlFor={field.name} className="sr-only">
                {t("passcode")}
              </label>
              <FormControl>
                <input
                  maxLength={6}
                  className="bg-transparent placeholder:text-formText pb-4 border-b-[0.5px] border-formText text-formText appearance-none focus:outline-none w-full text-base"
                  placeholder={t("passcode") + "*"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className="text-left text-base mb-16">{t("emailSent")}</p>
        <button className="sm:py-6 py-4 px-24 bg-egyptianBlue text-white rounded-full mt-24 mx-auto flex items-center justify-center">
          {t("confirmCode")}
        </button>
        <p className="mt-24 text-center text-base">
          <button
            type="button"
            className="underline underline-offset-4"
            onClick={handleSendCode}
          >
            {t("resendCode")}
          </button>
        </p>
      </form>
    </Form>
  );
};

export default ResetPasswordPartTwoForm;
