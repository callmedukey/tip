"use client";
import { CirclePlus, CircleMinus } from "lucide-react";
import PurposeIcon from "@/public/icons/purpose.svg";
import PlaneIcon from "@/public/icons/plane.svg";
import Person from "@/public/icons/person.svg";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { serviceCities } from "@/definitions/service-cities";
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocalStorage } from "usehooks-ts";
import { useEffect, useState } from "react";
import { initFormWithSession } from "@/actions/main-page";
import { formatDateToUTC } from "@/lib/time-formmater";
import { Checkbox } from "@radix-ui/react-checkbox";
import type { DateRange } from "react-day-picker";

const MainPageForm = ({
  setState,
}: {
  setState: (state: Record<string, string | number | Date | any>) => void;
}) => {
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

  form.watch("city");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="absolute max-w-[calc(100vw-2rem)] mt-[calc(var(--header-height)*4)]  lg:mt-[calc(var(--header-height)*2)] self-start bg-white px-6 py-4 lg:rounded-full rounded-[2rem] mx-4 flex lg:flex-row flex-col w-full lg:max-w-fit lg:mx-auto items-center text-formTex font-pretendard font-normal"
      >
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 max-w-[10rem] min-w-[10rem] w-full overflow-x-auto">
            <Image
              src={LocationIcon}
              height={32}
              width={32}
              className=""
              alt="Location Pin"
            />
            {form.getValues("city").length > 0
              ? form.getValues("city").join(", ")
              : "City"}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="max-h-[20rem] overflow-y-auto scrollbar-hide mt-8 w-fit">
            <FormField
              control={form.control}
              name="city"
              render={() => (
                <FormItem className="flex flex-col py-2">
                  {serviceCities.map((city) => (
                    <DropdownMenuItem key={city} asChild>
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={city}
                              className="flex flex-row items-start space-x-3 space-y-0 hover:opacity-60 py-2"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(city)}
                                  className=""
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, city])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== city
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal hover:bg-opacity-60">
                                {city}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    </DropdownMenuItem>
                  ))}
                </FormItem>
              )}
            />
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center lg:px-4 py-4 lg:py-0 border-b lg:border-r lg:border-b-0 border-dashed self-stretch">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "justify-center text-base text-left font-normal outline-none min-w-[20rem] border-none ring-0 focus:outline-none shadow-none flex items-center gap-6 lg:gap-2  w-[8rem] hover:bg-transparent pl-1 lg:pl-4"
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
                  <span>From</span>
                )}

                <Image
                  src={PlaneIcon}
                  alt="Plane"
                  width={24}
                  height={24}
                  className="mx-auto lg:mx-6"
                />
                <span>{date.to ? format(date.to, "yyyy-MM-dd") : "To"}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 mt-8" align="start">
              <Calendar
                mode="range"
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
                timeZone="UTC"
                required
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex items-center lg:px-4 pl-1 border-b lg:border-r lg:border-b-0 border-dashed py-6 lg:py-0 w-full lg:w-fit">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center lg:gap-2 gap-6 w-[8rem] ring-0 focus:ring-0">
              <Image src={Person} alt="Person Icon" width={24} height={24} />
              {form.getValues("adults") + form.getValues("infants") > 0
                ? `${
                    form.getValues("adults") + form.getValues("infants")
                  } Persons`
                : "Persons"}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-center mt-8">
              <DropdownMenuItem
                asChild
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="flex items-center gap-4">
                  <span className="block text-center flex-1">Adults</span>
                  <div className="flex items-center gap-4 flex-1">
                    <button
                      type="button"
                      className="text-center w-full flex  rounded-full justify-center items-center"
                      onClick={() =>
                        form.setValue("adults", form.getValues("adults") - 1)
                      }
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
                    <span>Infant</span>
                    <span className="text-[0.75rem] whitespace-nowrap">
                      ages 2 - 12
                    </span>
                  </span>
                  <div className="flex items-center gap-4 flex-1">
                    <button
                      type="button"
                      className="text-center w-full flex  rounded-full justify-center items-center"
                      onClick={() =>
                        form.setValue("adults", form.getValues("adults") - 1)
                      }
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
            <DropdownMenuTrigger className="flex items-center gap-6 lg:gap-2 w-[8rem] ring-0 focus:ring-0 capitalize">
              <Image
                src={PurposeIcon}
                alt="Purpose Icon"
                width={24}
                height={24}
              />
              {form.getValues("purpose")
                ? form.getValues("purpose")
                : "Purpose"}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-center mt-8">
              <DropdownMenuItem
                onClick={() => form.setValue("purpose", "business")}
              >
                Business
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => form.setValue("purpose", "leisure")}
              >
                Leisure
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
