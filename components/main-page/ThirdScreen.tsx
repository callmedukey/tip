"use client";

import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FinalFormSchema } from "@/definitions/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  customOptions,
  inclusiveOptions,
  packageOptionsKR,
} from "@/definitions/packages";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import AnotherFrance from "@/public/another-france.png";
import SmallAnotherFrance from "@/public/small-another-france.png";
import AnotherGreece from "@/public/another-greece.png";
import SmallAnotherGreece from "@/public/small-another-greece.png";
import { useLocalStorage } from "usehooks-ts";
import { submitRequest } from "@/actions/main-page";
import { useState } from "react";
import { Input } from "../ui/input";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";

const ThirdScreen = ({
  setState,
  initialState,
  packageType,
  returnToSecondScreen,
}: {
  setState: (state: {}) => void;
  initialState: Record<string, string | number | Date | any>;
  packageType: "all_inclusive" | "custom";
  returnToSecondScreen: () => void;
}) => {
  const locale = useLocale();
  const userId = useParams()?.userId;
  const t = useTranslations("MainThirdForm");
  const ui = useTranslations("ui");
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState(0);
  const [savedInitialData, setSavedInitialData] = useLocalStorage<Record<
    string,
    string | number | Date | any
  > | null>("initialData", null, {
    initializeWithValue: true,
  });
  const form = useForm<z.infer<typeof FinalFormSchema>>({
    resolver: zodResolver(FinalFormSchema),
    defaultValues: {
      options: [],
      extra: "",
      code: "",
      budget: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof FinalFormSchema>) => {
    if (loading) return;
    setSavedInitialData(null);

    setLoading(true);
    const response = await submitRequest({
      ...initialState,
      ...data,
      packageType,
      userId,
    });

    if (response?.error) {
      setLoading(false);
      return alert(response?.error);
    }

    if (response?.success) {
      setLoading(false);
      setState({
        options: data.options,
        extra: data.extra,
        code: data.code,
      });
    }
  };

  if (packageType === "all_inclusive") {
    return (
      <>
        <Button
          className="absolute lg:hidden top-[calc(var(--header-height)+2rem)] left-4 z-20 bg-transparent text-white text-[0.75rem] shadow-none gap-2 flex items-center hover:bg-transparent hover:opacity-80"
          type="button"
          onClick={() => {
            setStage(0);
            returnToSecondScreen();
          }}
        >
          {ui("back")}
        </Button>
        <div className="bg-formBg rounded-2xl py-12 px-8 lg:py-16 lg:px-16 self-start mt-[calc(var(--header-height)+6rem)] w-full mx-4 lg:mb-16 mb-28 lg:max-h-[120rem] max-w-7xl overflow-clip text-formText">
          <Button
            className="hidden text-murrey shadow-none px-0 gap-2 lg:flex items-center bg-transparent hover:bg-transparent hover:opacity-80 mb-12"
            type="button"
            onClick={returnToSecondScreen}
          >
            <ArrowLeft strokeWidth={1} />
            {ui("back")}
          </Button>
          <h3 className="text-[2rem]/[100%] font-medium lg:font-normal lg:text-[1.875rem]">
            {t("allInclusive")}
          </h3>
          <Form {...form}>
            <form
              className="lg:grid grid-cols-2"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <FormField
                control={form.control}
                name="options"
                render={() => (
                  <FormItem className="flex flex-col gap-8">
                    <p className="mt-12">Flight</p>
                    {inclusiveOptions.map((item, index) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="options"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className={cn(
                                "flex flex-row items-center space-x-6 space-y-0",
                                index === 0 || index === 1 ? "pl-16" : ""
                              )}
                            >
                              <FormControl>
                                <Checkbox
                                  className="data-[state=checked]:bg-egyptianBlue border-formText size-6 rounded-[0.25rem] text-base"
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          item.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal text-base">
                                {locale === "ko"
                                  ? packageOptionsKR[
                                      item.id as keyof typeof packageOptionsKR
                                    ]
                                  : item.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </FormItem>
                )}
              />
              <div className="">
                <FormField
                  control={form.control}
                  name="extra"
                  render={({ field }) => (
                    <FormItem className="relative isolate flex flex-col items-start gap-2 mt-8">
                      <FormLabel className="shrink-0 font-medium leading-[2.6rem]">
                        {t("other")}
                        <span className="text-egyptianBlue">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="border-none shadow-none bg-white rounded-[1rem] resize-none p-8 "
                          placeholder={
                            locale === "en"
                              ? `If "etc" was selected, please tell us the cities you want to travel to / Travel for honeymoon / Love activities! / Art gallery lover / Michelin restaurant recommendations / No more than 3 spots in 1 day / Hotel vacation preferred / Paris hot jazz club / hotel with pool / Versailles luxury hotel etc \n\nTell us your travel style ! We are here for you.`
                              : `기타 선택시 여행을 원하는 도시/ 허니문에 맞는 여행 / 액티비티를 너무 좋아해요! / 아트 갤러리 위주 / 미슐랭 레스토랑 2번 / 하루에 3군데 이상은 가고 싶지 않습니다 / 호캉스 위주 / 파리 핫한 재즈바 가고 싶어요! / 호텔은 수영장이 꼭 있어야해요 / 베르사유 럭셔리 호텔 등 \n\n여러분들의 여행 스타일을 알려주세요. 소중한 고객님의 스타일에 맞는 여행을 함께 만들어갑니다. 
`
                          }
                          rows={8}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem className="relative isolate flex flex-col items-start gap-2 mt-8">
                      <FormLabel className="shrink-0 font-medium leading-[2.6rem]">
                        {t("budget")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="border-none shadow-none bg-white rounded-[1rem] resize-none p-8 "
                          placeholder={
                            locale === "en"
                              ? `Let us know your budget so we can plan your trip accordingly`
                              : `여행 계획에 맞게 예산을 알려주세요.`
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem className="relative isolate flex flex-col items-start gap-2 mt-8">
                      <FormLabel className="shrink-0 font-medium leading-[2.6rem]">
                        {t("hasCoupon")}
                        <span className="text-egyptianBlue"></span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="border-none shadow-none bg-white rounded-[1rem] resize-none p-8 "
                          placeholder={t("enterCoupon")}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  disabled={loading}
                  type="submit"
                  className="bg-transparent hover:bg-transparent hover:opacity-80 rounded-full w-full max-w-xs py-6 mt-12 mx-auto flex items-center justify-center shadow-none text-egyptianBlue border-egyptianBlue border font-medium lg:mt-24"
                >
                  {t("submit")}
                </Button>
              </div>
            </form>
            <div className="relative isolate h-[20rem] -mx-16 -mb-16 mt-12">
              <Image
                src={AnotherFrance}
                alt="Another France"
                fill
                quality={100}
                placeholder="blur"
                className="object-cover object-left-bottom scale-110 opacity-[85%] bg-white bg-blend-normal hidden lg:block"
              />
              <Image
                src={SmallAnotherFrance}
                alt="Another France"
                fill
                quality={100}
                placeholder="blur"
                className="object-cover object-bottom sm:object-center opacity-[85%] bg-white bg-blend-normal lg:hidden"
              />
            </div>
          </Form>
        </div>
      </>
    );
  }

  if (packageType === "custom" && stage === 0) {
    return (
      <>
        <Button
          className="absolute lg:hidden top-[calc(var(--header-height)+2rem)] left-4 z-20 bg-transparent text-white text-[0.75rem] shadow-none gap-2 flex items-center hover:bg-transparent hover:opacity-80"
          type="button"
          onClick={returnToSecondScreen}
        >
          <ArrowLeft strokeWidth={1} />
          back
        </Button>
        <div className="bg-formBg rounded-2xl py-12 px-8 lg:py-16 lg:px-16 self-start mt-[calc(var(--header-height)+6rem)] w-full mx-4 mb-16 lg:max-h-[120rem] max-w-7xl overflow-clip text-formText">
          <Button
            className="hidden text-murrey shadow-none px-0 gap-2 lg:flex items-center bg-transparent hover:bg-transparent hover:opacity-80 mb-12"
            type="button"
            onClick={returnToSecondScreen}
          >
            <ArrowLeft strokeWidth={1} />
            back
          </Button>
          <h3 className="text-[2rem]/[100%] font-medium lg:font-normal lg:text-[1.875rem]">
            {t("custom")}
          </h3>
          <Form {...form}>
            <form
              className="lg:grid grid-cols-2"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <FormField
                control={form.control}
                name="options"
                render={() => (
                  <FormItem className="flex flex-col gap-8">
                    <p className="mt-12">Flight</p>
                    {inclusiveOptions.slice(0, 4).map((item, index) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="options"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className={cn(
                                "flex flex-row items-center space-x-6 space-y-0",
                                index === 0 || index === 1 ? "pl-16" : ""
                              )}
                            >
                              <FormControl>
                                <Checkbox
                                  className="data-[state=checked]:bg-egyptianBlue border-formText size-6 rounded-[0.25rem] text-base"
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          item.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal text-base">
                                {locale === "ko"
                                  ? packageOptionsKR[
                                      item.id as keyof typeof packageOptionsKR
                                    ]
                                  : item.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </FormItem>
                )}
              />
              <div className="mt-8 lg:mt-0">
                <FormField
                  control={form.control}
                  name="options"
                  render={() => (
                    <FormItem className="flex flex-col gap-8">
                      {inclusiveOptions.slice(4).map((item, index) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="options"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className={cn(
                                  "flex flex-row items-center space-x-6 space-y-0"
                                )}
                              >
                                <FormControl>
                                  <Checkbox
                                    className="data-[state=checked]:bg-egyptianBlue border-formText size-6 rounded-[0.25rem] text-base"
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            item.id,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.id
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal text-base">
                                  {locale === "ko"
                                    ? packageOptionsKR[
                                        item.id as keyof typeof packageOptionsKR
                                      ]
                                    : item.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </FormItem>
                  )}
                />

                <Button
                  type="button"
                  onClick={() => {
                    setStage(1);
                  }}
                  className="bg-egyptianBlue hover:bg-egyptianBlue hover:opacity-80 rounded-full w-full max-w-xs py-6 mt-12 mx-auto flex items-center justify-center shadow-none text-egyptianBlue border-egyptianBlue border font-medium lg:mt-16 text-white"
                >
                  Next
                </Button>
              </div>
            </form>
            <div className="relative isolate h-[20rem] -mx-16 -mb-16 mt-12">
              <Image
                src={AnotherGreece}
                alt="Another Greece"
                fill
                quality={100}
                placeholder="blur"
                className="object-cover object-left-bottom scale-110 opacity-[85%] bg-white bg-blend-normal hidden lg:block"
              />
              <Image
                src={SmallAnotherGreece}
                alt="Another Greece"
                fill
                quality={100}
                placeholder="blur"
                className="object-cover object-bottom sm:object-center opacity-[85%] bg-white bg-blend-normal lg:hidden"
              />
            </div>
          </Form>
        </div>
      </>
    );
  }
  if (packageType === "custom" && stage === 1) {
    return (
      <>
        <Button
          className="absolute lg:hidden top-[calc(var(--header-height)+2rem)] left-4 z-20 bg-transparent text-white text-[0.75rem] shadow-none gap-2 flex items-center hover:bg-transparent hover:opacity-80"
          type="button"
          onClick={() => setStage(0)}
        >
          <ArrowLeft strokeWidth={1} />
          back
        </Button>
        <div className="bg-formBg rounded-2xl py-12 px-8 lg:py-16 lg:px-16 self-start mt-[calc(var(--header-height)+6rem)] w-full mx-4 mb-28 lg:mb-16 lg:max-h-[120rem] max-w-7xl overflow-clip text-formText">
          <Button
            className="hidden text-murrey shadow-none px-0 gap-2 lg:flex items-center bg-transparent hover:bg-transparent hover:opacity-80 mb-12"
            type="button"
            onClick={() => setStage(0)}
          >
            <ArrowLeft strokeWidth={1} />
            back
          </Button>
          <h3 className="text-[2rem]/[100%] font-medium lg:font-normal lg:text-[1.875rem]">
            Custom package
          </h3>
          <Form {...form}>
            <form
              className="lg:grid grid-cols-3"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <FormField
                control={form.control}
                name="options"
                render={() => (
                  <FormItem className="flex flex-col gap-8 mt-12">
                    {customOptions.slice(0, 5).map((item, index) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="options"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className={cn(
                                "flex flex-row items-center space-x-6 space-y-0",
                                index === 0 && "items-start"
                              )}
                            >
                              <FormControl>
                                <Checkbox
                                  className="data-[state=checked]:bg-egyptianBlue border-formText size-6 rounded-[0.25rem] text-base"
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          item.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              {index === 0 ? (
                                <FormLabel className="font-normal text-base flex flex-col">
                                  <span>
                                    {locale === "ko"
                                      ? packageOptionsKR[
                                          item.id as keyof typeof packageOptionsKR
                                        ]
                                      : item.label}
                                  </span>
                                  <span>{t("languageAndTime")}</span>
                                </FormLabel>
                              ) : (
                                <FormLabel className="font-normal text-base">
                                  {locale === "ko"
                                    ? packageOptionsKR[
                                        item.id as keyof typeof packageOptionsKR
                                      ]
                                    : item.label}
                                </FormLabel>
                              )}
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="options"
                render={() => (
                  <FormItem className="flex flex-col gap-8 mt-12">
                    {customOptions
                      .slice(5, customOptions.length)
                      .map((item, index) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="options"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className={cn(
                                  "flex flex-row items-center space-x-6 space-y-0"
                                )}
                              >
                                <FormControl>
                                  <Checkbox
                                    className="data-[state=checked]:bg-egyptianBlue border-formText size-6 rounded-[0.25rem] text-base"
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            item.id,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.id
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal text-base">
                                  {locale === "ko"
                                    ? packageOptionsKR[
                                        item.id as keyof typeof packageOptionsKR
                                      ]
                                    : item.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                  </FormItem>
                )}
              />
              <div className="col-start-3 row-start-1">
                <FormField
                  control={form.control}
                  name="extra"
                  render={({ field }) => (
                    <FormItem className="relative isolate flex flex-col items-start gap-2 mt-8">
                      <FormLabel className="shrink-0 font-medium leading-[2.6rem]">
                        {t("other")}
                        <span className="text-egyptianBlue">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="border-none shadow-none bg-white rounded-[1rem] resize-none p-8 "
                          placeholder={t("otherRequests")}
                          rows={3}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem className="relative isolate flex flex-col items-start gap-2 mt-4">
                      <FormLabel className="shrink-0 font-medium leading-[2.6rem]">
                        {t("budget")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="border-none shadow-none bg-white rounded-[1rem] resize-none p-8 "
                          placeholder={
                            locale === "en"
                              ? `Let us know your budget so we can plan your trip accordingly`
                              : `여행 계획에 맞게 예산을 알려주세요.`
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem className="relative isolate flex flex-col items-start gap-2 mt-4">
                      <FormLabel className="shrink-0 font-medium leading-[2.6rem]">
                        {t("hasCoupon")}{" "}
                        <span className="text-egyptianBlue"></span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="border-none shadow-none bg-white rounded-[1rem] resize-none p-8 "
                          placeholder={t("enterCoupon")}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="bg-egyptianBlue hover:bg-egyptianBlue hover:opacity-80 rounded-full w-full max-w-xs py-6 mt-8 mx-auto flex items-center justify-center shadow-none text-egyptianBlue border-egyptianBlue border font-medium lg:mt-8 text-white"
                >
                  {t("submit")}
                </Button>
              </div>
            </form>
            <div className="relative isolate h-[20rem] -mx-16 -mb-16 mt-12">
              <Image
                src={AnotherGreece}
                alt="Another Greece"
                fill
                quality={100}
                placeholder="blur"
                className="object-cover object-left-bottom scale-110 opacity-[85%] bg-white bg-blend-normal hidden lg:block"
              />
              <Image
                src={SmallAnotherGreece}
                alt="Another Greece"
                fill
                quality={100}
                placeholder="blur"
                className="object-cover object-bottom sm:object-center opacity-[85%] bg-white bg-blend-normal lg:hidden"
              />
            </div>
          </Form>
        </div>
      </>
    );
  }

  return null;
};

export default ThirdScreen;
