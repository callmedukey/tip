"use client";
import { CirclePlus, CircleMinus } from "lucide-react";
import PurposeIcon from "@/public/icons/purpose.svg";
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
import PlaneIcon from "@/public/icons/plane.svg";
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
import { Checkbox } from "../ui/checkbox";

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
  const handleLocaleLogic = (cities: string[], locale: string) => {
    if (!cities.length) {
      return t("city");
    }

    if (locale === "en") {
      if (cities.length > 1) {
        return `${cities[0]} & ${cities.length - 1} more`;
      }

      if (cities.length === 1) {
        return cities[0];
      }
    }

    if (locale === "ko") {
      if (cities.length > 1) {
        return `${cities[0]} 외 ${cities.length - 1}`;
      }

      if (cities.length === 1) {
        return cities[0];
      }
    }
  };
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
        className="absolute max-w-[calc(100vw-2rem)] [@media(max-width:1024px)]:max-w-md mt-[calc(var(--header-height)*4)]  lg:mt-[calc(var(--header-height)*2)] self-start bg-white px-2 lg:px-6 pt-4 lg:pt-2 pb-2 lg:rounded-full rounded-[2rem] mx-4 flex lg:flex-row flex-col w-full lg:max-w-fit lg:mx-auto items-center text-formTex font-pretendard font-normal"
      >
        <DropdownMenu>
          <DropdownMenuTrigger className="flex z-50 items-center focus:outline-none gap-2 lg:max-w-[14rem] min-w-[14rem] w-full overflow-x-auto border-b lg:border-r lg:border-b-0 border-dashed pb-4 lg:pb-0 px-4 scrollbar-hide">
            <Image
              src={LocationIcon}
              height={32}
              width={32}
              alt="Location Pin"
            />
            {handleLocaleLogic(form.getValues("city"), locale)}
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="max-h-[20rem] overflow-y-auto scrollbar-hide lg:mt-8 lg:w-fit"
            align="start"
          >
            <FormField
              control={form.control}
              name="city"
              render={() => (
                <FormItem className="flex flex-col py-2">
                  {serviceCountryAndCities[locale as "en" | "ko"]
                    .sort((a, b) => {
                      if (a.country === "ETC" || a.country === "기타") {
                        return 1;
                      }
                      return a.country.localeCompare(b.country);
                    })
                    .map((city) => (
                      <DropdownMenuSub key={city.country}>
                        <DropdownMenuSubTrigger>
                          {city.country}
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent className="ml-2">
                            {city.cities
                              .sort((a, b) => a.localeCompare(b))
                              .map((city) => (
                                <div
                                  key={city}
                                  className="flex items-center gap-2 justify-between"
                                >
                                  {city}
                                  <Checkbox
                                    key={city}
                                    onClick={(e) => {
                                      handleCityChange(city);
                                    }}
                                    checked={form
                                      .getValues("city")
                                      .includes(city)}
                                  />
                                </div>
                              ))}
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                    ))}
                </FormItem>
              )}
            />
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center lg:px-4 py-4 lg:py-0 border-b lg:border-r lg:border-b-0 border-dashed self-stretch pl-4 lg:pl-0">
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
        <div className="flex items-center lg:px-4 pl-1 border-b lg:border-r lg:border-b-0 border-dashed py-6 lg:py-0 w-full lg:w-fit pl-4 lg:pl-0">
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
              <DropdownMenuItem asChild onClick={(e) => {}}>
                <div className="flex items-center gap-4">
                  <span className="block text-center flex-1">
                    {t("adults")}
                  </span>
                  <div className="flex items-center gap-4 flex-1">
                    <button
                      type="button"
                      className="text-center w-full flex  rounded-full justify-center items-center"
                      onClick={(e) => {
                        e.stopPropagation();
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
                      onClick={(e) => {
                        e.stopPropagation();
                        form.setValue("adults", form.getValues("adults") + 1);
                      }}
                    >
                      <CirclePlus strokeWidth={1} />
                    </button>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem asChild onClick={(e) => {}}>
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
                      onClick={(e) => {
                        e.stopPropagation();
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
                      onClick={(e) => {
                        e.stopPropagation();
                        form.setValue("infants", form.getValues("infants") + 1);
                      }}
                    >
                      <CirclePlus strokeWidth={1} />
                    </button>
                  </div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center lg:px-4 py-4 lg:py-0 w-full lg:w-fit pl-1 border-b border-dashed lg:border-b-0 pl-4 lg:pl-0">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 lg:gap-2 w-[8rem] ring-0 focus:ring-0 capitalize">
              <Image
                src={PurposeIcon}
                alt="Purpose Icon"
                width={24}
                height={24}
              />
              {form.getValues("purpose")
                ? form.getValues("purpose") === "business"
                  ? t("business")
                  : t("leisure")
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
          className="rounded-full bg-formButton py-6 px-4 font-normal hover:bg-formButton/90 mt-2 lg:my-0 min-w-[6rem]"
        >
          {t("getAQuote")}
        </Button>
      </form>
    </Form>
  );
};

export default MainPageForm;
