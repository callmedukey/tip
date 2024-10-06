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
import { customOptions, inclusiveOptions } from "@/definitions/packages";
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
    },
  });

  const handleSubmit = async (data: z.infer<typeof FinalFormSchema>) => {
    setSavedInitialData(null);
    setState({
      options: data.options,
      extra: data.extra,
    });
    setLoading(true);
    const response = await submitRequest({
      ...initialState,
      ...data,
      packageType,
    });

    if (response?.error) {
      return alert(response?.error);
    }

    if (response?.success) {
      setLoading(false);
      setState({
        options: data.options,
        extra: data.extra,
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
            All inclusive package
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
                                {item.label}
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
                        Other<span className="text-egyptianBlue">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="border-none shadow-none bg-white rounded-[1rem] resize-none p-8 "
                          placeholder="Let us know if you have any other requests."
                          rows={8}
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
                  Next
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
            Custom package
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
                                {item.label}
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
                                  {item.label}
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
                    console.log(stage);
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
        <div className="bg-formBg rounded-2xl py-12 px-8 lg:py-16 lg:px-16 self-start mt-[calc(var(--header-height)+6rem)] w-full mx-4 mb-16 lg:max-h-[120rem] max-w-7xl overflow-clip text-formText">
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
                                  <span>{item.label}</span>
                                  <span>
                                    Language and time to be confirmed*
                                  </span>
                                </FormLabel>
                              ) : (
                                <FormLabel className="font-normal text-base">
                                  {item.label}
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
                      .slice(5, customOptions.length - 1)
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
                                  {item.label}
                                </FormLabel>
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
                  <FormItem className="flex flex-col gap-8 mt-12 h-fit row-start-1 col-start-3">
                    {customOptions
                      .slice(customOptions.length - 1)
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
                                  {item.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                  </FormItem>
                )}
              />
              <div className="col-start-3 row-start-1 lg:mt-16">
                <FormField
                  control={form.control}
                  name="extra"
                  render={({ field }) => (
                    <FormItem className="relative isolate flex flex-col items-start gap-2 mt-8">
                      <FormLabel className="shrink-0 font-medium leading-[2.6rem]">
                        Other<span className="text-egyptianBlue">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="border-none shadow-none bg-white rounded-[1rem] resize-none p-8 "
                          placeholder="Let us know if you have any other requests."
                          rows={3}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
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

  return null;
};

export default ThirdScreen;
