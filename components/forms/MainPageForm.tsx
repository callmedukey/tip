"use client";
import { CirclePlus, CircleMinus } from "lucide-react";
import PurposeIcon from "@/public/icons/purpose.svg";
import PlaneIcon from "@/public/icons/plane.svg";
import Person from "@/public/icons/person.svg";
import { Calendar } from "@/components/ui/calendar";
import { ko, enUS } from "date-fns/locale";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { serviceCountryAndCities } from "@/definitions/service-cities";
import LocationIcon from "@/public/icons/location.svg";
import { MainPageFormSchema } from "@/definitions/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import CalendarIcon from "@/public/icons/Calendar.svg";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocalStorage } from "usehooks-ts";
import { useEffect, useState } from "react";
import { initFormWithSession } from "@/actions/main-page";
import { formatDateToUTC } from "@/lib/time-formmater";
import type { DateRange } from "react-day-picker";
import { useLocale, useTranslations } from "next-intl";

const MainPageForm = ({
  setState,
}: {
  setState: (state: Record<string, string | number | Date | any>) => void;
}) => {
  const locale = useLocale();
  const t = useTranslations("MainFirstForm");
  const [savedInitialData, setSavedInitialData] = useLocalStorage<Record<
    string,
    string | number | Date | any
  > | null>("initialData", null, {
    initializeWithValue: false,
  });

  const [date, setDate] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });

  const form = useForm<z.infer<typeof MainPageFormSchema>>({
    resolver: zodResolver(MainPageFormSchema),
    defaultValues: {
      city: [],
      adults: 0,
      infants: 0,
      purpose: "",
    },
  });

  form.watch("adults");
  form.watch("infants");
  form.watch("purpose");

  const onSubmit = async (data: z.infer<typeof MainPageFormSchema>) => {
    if (!data.city) {
      alert("Please select a city");
      return;
    }

    if (!date.from) {
      alert("Please select a From date");
      return;
    }

    if (!date.to) {
      alert("Please select a To date");
      return;
    }

    if (!data.adults) {
      alert("Please select a number of adults");
      return;
    }

    if (!data.purpose) {
      alert("Please select a purpose");
      return;
    }

    if (!new Date(date.from) || !new Date(date.to)) {
      alert("Please select a From date and To date");
      return;
    }

    if (date.from < new Date()) {
      alert("From date must be after today");
      return;
    }

    if (date.to && date.from && date.to <= date.from) {
      alert("To date must be after From date");
      return;
    }

    setSavedInitialData(data);
    await initFormWithSession();
    setState({
      ...data,
      from: formatDateToUTC(date.from),
      to: formatDateToUTC(date.to),
    });
  };

  useEffect(() => {
    const initForm = async () => {
      await initFormWithSession();
    };
    if (savedInitialData) {
      initForm();
      setState(savedInitialData);
    }
  }, [savedInitialData]);

  const handleCityChange = (city: string) => {
    if (form.getValues("city").includes(city)) {
      form.setValue(
        "city",
        form.getValues("city").filter((value) => value !== city)
      );
    } else {
      form.setValue("city", [...form.getValues("city"), city]);
    }
  };
  form.watch("city");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="absolute max-w-[calc(100vw-2rem)] [@media(max-width:1024px)]:max-w-md mt-[calc(var(--header-height)*4)]  lg:mt-[calc(var(--header-height)*2)] self-start bg-white px-2 lg:px-6 py-4 lg:rounded-full rounded-[2rem] mx-4 flex lg:flex-row flex-col w-full lg:max-w-fit lg:mx-auto items-center text-formTex font-pretendard font-normal"
      >
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 lg:max-w-[10rem] min-w-[10rem] w-full overflow-x-auto border-b lg:border-r lg:border-b-0 border-dashed pb-4 lg:pb-0">
            <Image
              src={LocationIcon}
              height={32}
              width={32}
              className=""
              alt="Location Pin"
            />
            {form.getValues("city").length > 0
              ? form.getValues("city").join(", ")
              : t("city")}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="max-h-[20rem] overflow-y-auto scrollbar-hide lg:mt-8 lg:w-fit">
            <FormField
              control={form.control}
              name="city"
              render={() => (
                <FormItem className="flex flex-col py-2">
                  {serviceCountryAndCities[locale as "en" | "ko"].map(
                    (city) => (
                      <DropdownMenuSub key={city.country}>
                        <DropdownMenuSubTrigger>
                          {city.country}
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            {city.cities.map((city) => (
                              <DropdownMenuItem
                                key={city}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleCityChange(city);
                                }}
                              >
                                {city}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                      // <DropdownMenuItem key={city} asChild>
                      //   <FormField
                      //     control={form.control}
                      //     name="city"
                      //     render={({ field }) => {
                      //       return (
                      //         <FormItem
                      //           key={city}
                      //           className="flex flex-row items-start space-x-3 space-y-0 hover:opacity-60 py-2"
                      //         >
                      //           <FormControl>
                      //             <Checkbox
                      //               checked={field.value?.includes(city)}
                      //               className=""
                      //               onCheckedChange={(checked) => {
                      //                 return checked
                      //                   ? field.onChange([...field.value, city])
                      //                   : field.onChange(
                      //                       field.value?.filter(
                      //                         (value) => value !== city
                      //                       )
                      //                     );
                      //               }}
                      //             />
                      //           </FormControl>
                      //           <FormLabel className="font-normal hover:bg-opacity-60">
                      //             {city}
                      //           </FormLabel>
                      //         </FormItem>
                      //       );
                      //     }}
                      //   />
                      // </DropdownMenuItem>
                    )
                  )}
                </FormItem>
              )}
            />
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center lg:px-4 py-4 lg:py-0 border-b lg:border-r lg:border-b-0 border-dashed self-stretch ">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "justify-center text-base text-left font-normal outline-none lg:min-w-[20rem] min-w-[10rem] border-none ring-0 focus:outline-none shadow-none flex items-center gap-2 sm:gap-4 lg:gap-2 hover:bg-transparent pl-1 lg:pl-4"
                )}
              >
                <Image
                  src={CalendarIcon}
                  alt="Calendar"
                  width={24}
                  height={24}
                  className="-translate-y-0.5"
                />
                {date.from ? (
                  format(date.from, "yyyy-MM-dd")
                ) : (
                  <span>{t("startDate")}</span>
                )}

                <Image
                  src={PlaneIcon}
                  alt="Plane"
                  width={24}
                  height={24}
                  className="mx-auto lg:mx-6"
                />
                <span>
                  {date.to ? format(date.to, "yyyy-MM-dd") : t("endDate")}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 lg:mt-8" align="start">
              <Calendar
                mode="range"
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
                timeZone="UTC"
                locale={locale === "ko" ? ko : enUS}
                required
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex items-center lg:px-4 pl-1 border-b lg:border-r lg:border-b-0 border-dashed py-6 lg:py-0 w-full lg:w-fit">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center lg:gap-2 gap-2 w-[8rem] ring-0 focus:ring-0">
              <Image src={Person} alt="Person Icon" width={24} height={24} />
              {form.getValues("adults") + form.getValues("infants") > 0
                ? `${form.getValues("adults") + form.getValues("infants")} ${
                    locale === "ko" ? "명" : "Persons"
                  }`
                : t("persons")}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-center lg:mt-8">
              <DropdownMenuItem
                asChild
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="flex items-center gap-4">
                  <span className="block text-center flex-1">
                    {t("adults")}
                  </span>
                  <div className="flex items-center gap-4 flex-1">
                    <button
                      type="button"
                      className="text-center w-full flex  rounded-full justify-center items-center"
                      onClick={() => {
                        if (form.getValues("adults") > 0) {
                          form.setValue("adults", form.getValues("adults") - 1);
                        }
                      }}
                    >
                      <CircleMinus strokeWidth={1} />
                    </button>
                    {form.getValues("adults")}
                    <button
                      type="button"
                      className="text-center w-full flex rounded-full justify-center items-center"
                      onClick={() =>
                        form.setValue("adults", form.getValues("adults") + 1)
                      }
                    >
                      <CirclePlus strokeWidth={1} />
                    </button>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="flex items-center gap-4">
                  <span className="flex flex-col flex-1">
                    <span>{t("infants")}</span>
                    <span className="text-[0.75rem] whitespace-nowrap">
                      {t("ages")}
                    </span>
                  </span>
                  <div className="flex items-center gap-4 flex-1">
                    <button
                      type="button"
                      className="text-center w-full flex  rounded-full justify-center items-center"
                      onClick={() => {
                        if (form.getValues("infants") > 0) {
                          form.setValue(
                            "infants",
                            form.getValues("infants") - 1
                          );
                        }
                      }}
                    >
                      <CircleMinus strokeWidth={1} />
                    </button>
                    {form.getValues("infants")}
                    <button
                      type="button"
                      className="text-center w-full flex rounded-full justify-center items-center"
                      onClick={() =>
                        form.setValue("infants", form.getValues("infants") + 1)
                      }
                    >
                      <CirclePlus strokeWidth={1} />
                    </button>
                  </div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center lg:px-4 py-4 lg:py-0 w-full lg:w-fit pl-1 border-b border-dashed lg:border-b-0">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 lg:gap-2 w-[8rem] ring-0 focus:ring-0 capitalize">
              <Image
                src={PurposeIcon}
                alt="Purpose Icon"
                width={24}
                height={24}
              />
              {form.getValues("purpose")
                ? form.getValues("purpose")
                : t("purpose")}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-center lg:mt-8">
              <DropdownMenuItem
                onClick={() => form.setValue("purpose", "business")}
              >
                {t("business")}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => form.setValue("purpose", "leisure")}
              >
                {t("leisure")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button
          type="submit"
          className="rounded-full bg-formButton py-6 px-4 font-normal hover:bg-formButton/90 my-6 lg:my-0"
        >
          Get a quote
        </Button>
      </form>
    </Form>
  );
};

export default MainPageForm;
