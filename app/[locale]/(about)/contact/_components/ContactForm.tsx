"use client";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { ContactFormSchema } from "@/definitions/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTranslations, useLocale } from "next-intl";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { sendContactForm } from "@/actions/normal-user";
const ContactForm = () => {
  const t = useTranslations("ContactPage");
  const locale = useLocale();
  const form = useForm<z.infer<typeof ContactFormSchema>>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      where: "",
      when: "",
      budget: "",
      how: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof ContactFormSchema>) => {
    const response = await sendContactForm(data);
    if (response.success) {
      alert(t("success"));
    } else {
      alert(t("error"));
    }
  };
  return (
    <Form {...form}>
      <form
        className="mt-12 lg:mt-24"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <fieldset className="grid grid-cols-2 gap-8">
          {locale === "ko" ? (
            <>
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center relative">
                    <label htmlFor={field.name} className="sr-only">
                      {t("lastName")}
                    </label>
                    <FormControl>
                      <input
                        className="bg-transparent placeholder:text-formText pb-4 border-b-[0.5px] border-formText text-formText appearance-none focus:outline-none w-full text-base"
                        placeholder={t("lastName")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center relative">
                    <label htmlFor={field.name} className="sr-only">
                      {t("firstName")}
                    </label>
                    <FormControl>
                      <input
                        className="bg-transparent placeholder:text-formText pb-4 border-b-[0.5px] border-formText text-formText appearance-none focus:outline-none w-full text-base"
                        placeholder={t("firstName")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          ) : (
            <>
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center relative">
                    <label htmlFor={field.name} className="sr-only">
                      {t("firstName")}
                    </label>
                    <FormControl>
                      <input
                        className="bg-transparent placeholder:text-formText pb-4 border-b-[0.5px] border-formText text-formText appearance-none focus:outline-none w-full text-base"
                        placeholder={t("firstName")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center relative">
                    <label htmlFor={field.name} className="sr-only">
                      {t("lastName")}
                    </label>
                    <FormControl>
                      <input
                        className="bg-transparent placeholder:text-formText pb-4 border-b-[0.5px] border-formText text-formText appearance-none focus:outline-none w-full text-base"
                        placeholder={t("lastName")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        </fieldset>
        <fieldset className="grid grid-cols-2 gap-8 mt-6">
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
        </fieldset>
        <FormField
          control={form.control}
          name="where"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center relative mt-6">
              <label htmlFor={field.name} className="sr-only">
                {t("where")}
              </label>
              <FormControl>
                <input
                  className="bg-transparent placeholder:text-formText pb-4 border-b-[0.5px] border-formText text-formText appearance-none focus:outline-none w-full text-base"
                  placeholder={t("where")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="when"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center relative mt-6">
              <label htmlFor={field.name} className="sr-only">
                {t("when")}
              </label>
              <FormControl>
                <input
                  className="bg-transparent placeholder:text-formText pb-4 border-b-[0.5px] border-formText text-formText appearance-none focus:outline-none w-full text-base"
                  placeholder={t("when")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="areThereAnyQuestions"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center relative mt-6">
              <label htmlFor={field.name} className="sr-only">
                {t("areThereAnyQuestions")}
              </label>
              <FormControl>
                <Textarea
                  className="bg-transparent border-none resize-none shadow-none ring-0 outline-none appearance-none placeholder:text-formText pb-4 border-b-[0.5px] border-formText text-formText focus:outline-none w-full text-base placeholder:text-center"
                  placeholder={t("areThereAnyQuestions")}
                  {...field}
                  rows={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="budget"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center relative mt-2">
              <label htmlFor={field.name} className="sr-only">
                {t("budget")}
              </label>
              <FormControl>
                <input
                  className="bg-transparent placeholder:text-formText pb-4 border-b-[0.5px] border-formText text-formText appearance-none focus:outline-none w-full text-base"
                  placeholder={t("budget")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="how"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center relative mt-6">
              <label htmlFor={field.name} className="sr-only">
                {t("how")}
              </label>
              <FormControl>
                <input
                  className="bg-transparent placeholder:text-formText pb-4 border-b-[0.5px] border-formText text-formText appearance-none focus:outline-none w-full text-base"
                  placeholder={t("how")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full mt-8 py-6 px-12 bg-egyptianBlue max-w-fit mx-auto flex rounded-full">
          {t("submit")}
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
