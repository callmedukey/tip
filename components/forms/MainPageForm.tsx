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
import CalendarIcon from "@/public/icons/calendar.svg";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocalStorage } from "usehooks-ts";
import { useEffect } from "react";
import { initFormWithSession } from "@/actions/main-page";
import { formatDateToUTC } from "@/lib/time-formmater";

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

  const form = useForm<z.infer<typeof MainPageFormSchema>>({
    resolver: zodResolver(MainPageFormSchema),
    defaultValues: {
      city: "",
      from: null,
      to: null,
      adults: 0,
      infants: 0,
      purpose: "",
    },
  });

  const setTravelFrom = (date: Date | null) => {
    form.setValue("from", date);
  };
  const setTravelTo = (date: Date | null) => {
    form.setValue("to", date);
  };
  form.watch("to");
  form.watch("from");
  form.watch("adults");
  form.watch("infants");
  form.watch("purpose");

  const onSubmit = async (data: z.infer<typeof MainPageFormSchema>) => {
    if (!data.city) {
      alert("Please select a city");
      return;
    }

    if (!data.from) {
      alert("Please select a From date");
      return;
    }

    if (!data.to) {
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

    if (!new Date(data?.from) || !new Date(data?.to)) {
      alert("Please select a From date and To date");
      return;
    }

    if (data.from < new Date()) {
      alert("From date must be after today");
      return;
    }

    if (data.to && data.from && data.to <= data.from) {
      alert("To date must be after From date");
      return;
    }

    setSavedInitialData(data);
    await initFormWithSession();
    setState({
      ...data,
      from: formatDateToUTC(data.from),
      to: formatDateToUTC(data.to),
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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="absolute max-w-[calc(100vw-2rem)] mt-[calc(var(--header-height)*4)]  lg:mt-[calc(var(--header-height)*2)] self-start bg-white px-6 py-4 lg:rounded-full rounded-[2rem] mx-4 flex lg:flex-row flex-col w-full lg:max-w-fit lg:mx-auto items-center text-formTex font-pretendard font-normal"
      >
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="relative isolate flex items-center gap-2 my-auto border-b  lg:border-r lg:border-b-0 h-12 border-dashed w-full lg:w-fit">
              <FormLabel className="shrink-0">
                <Image
                  src={LocationIcon}
                  height={32}
                  width={32}
                  className=""
                  alt="Location Pin"
                />
                <span className="sr-only">City</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="!mt-0 !pt-0 !pb-0 border-none shadow-none min-w-[10rem] focus:ring-0">
                    <SelectValue
                      placeholder="City"
                      className="!mt-0 !pt-0 !mb-0 !pb-0 shadow-none"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent position="popper" className="mt-8">
                  {serviceCities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {" "}
                      {city}{" "}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <div className="flex items-center lg:px-4 py-4 lg:py-0 border-b lg:border-r lg:border-b-0 border-dashed self-stretch">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "justify-start text-left font-normal outline-none border-none ring-0 focus:outline-none shadow-none flex items-center gap-6 lg:gap-2  w-[8rem] hover:bg-transparent pl-1 lg:pl-4"
                  // !searchDate && "text-muted-foreground"
                )}
              >
                <Image
                  src={CalendarIcon}
                  alt="Calendar"
                  width={24}
                  height={24}
                  className="-translate-y-0.5"
                />
                {form.getValues("from") ? (
                  format(form.getValues("from") as Date, "yyyy-MM-dd")
                ) : (
                  <span>From</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 mt-8" align="start">
              <Calendar
                mode="single"
                selected={new Date(form.getValues("from") as Date) || undefined}
                onSelect={(day) => setTravelFrom(day || null)}
              />
            </PopoverContent>
          </Popover>
          <Image
            src={PlaneIcon}
            alt="Plane"
            width={24}
            height={24}
            className="mx-auto lg:mx-6"
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "justify-start lg:justify-start text-left font-normal outline-none border-none ring-0 focus:outline-none shadow-none flex items-center gap-2 w-[8rem] hover:bg-transparent"
                )}
              >
                <Image
                  src={CalendarIcon}
                  alt="Calendar"
                  width={24}
                  height={24}
                  className="-translate-y-0.5"
                />
                {form.getValues("to") ? (
                  format(form.getValues("to") as Date, "yyyy-MM-dd")
                ) : (
                  <span>To</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 mt-8" align="start">
              <Calendar
                mode="single"
                selected={new Date(form.getValues("to") as Date) || undefined}
                onSelect={(day) => setTravelTo(day || null)}
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
