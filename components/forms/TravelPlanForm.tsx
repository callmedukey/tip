"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import CalendarIcon from "@/public/icons/Calendar.svg";

import { TravelPlanFormSchema } from "@/definitions/zod";
import { Button } from "../ui/button";
import type { TravelPlanArray } from "@/definitions/request-details";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { saveTravelPlan } from "@/actions/admin";
import { useSearchParams } from "next/navigation";
import { formatDateToUTC } from "@/lib/time-formmater";
import { useTranslations } from "next-intl";

const TravelPlanForm = ({ plan }: { plan?: TravelPlanArray | null }) => {
  const t = useTranslations("adminPlanner");
  const searchParams = useSearchParams();
  const requestId = searchParams.get("id");
  const form = useForm<z.infer<typeof TravelPlanFormSchema>>({
    resolver: zodResolver(TravelPlanFormSchema),
    defaultValues: {
      json: plan || [
        {
          date: new Date(),
          day: "",
          time: "",
          placeName: "",
          longitude: "",
          latitude: "",
        },
      ],
    },
  });

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control: form.control, // control props comes from useForm (optional: if you are using FormProvider)
      name: "json", // unique name for your Field Array
    }
  );

  const onSubmit = async (data: z.infer<typeof TravelPlanFormSchema>) => {
    const response = await saveTravelPlan({
      requestId: requestId!,
      travelPlan: data.json.map((item) => ({
        ...item,
        date: formatDateToUTC(item.date) as unknown as Date,
      })),
    });

    if (response?.error) {
      return alert(response.error);
    }

    alert("저장되었습니다");
  };

  return (
    <Form {...form}>
      <form
        className="mt-6 w-full overflow-x-auto"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex gap-4 items-center h-12 px-4 relative isolate"
          >
            <FormField
              control={form.control}
              name={`json.${index}.date`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "justify-start text-left font-normal outline-none border-none focus:outline-none shadow-none flex items-center gap-6 lg:gap-2 ring-black rounded-none ring-1 w-[10rem] hover:bg-transparent pl-1 lg:pl-4"
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
                          {field.value ? (
                            format(field.value, "yyyy-MM-dd")
                          ) : (
                            <span>{t("date")}</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 mt-8" align="start">
                        <Calendar
                          locale={ko}
                          mode="single"
                          selected={new Date(field.value as Date) || undefined}
                          onSelect={(day) => field.onChange(day || null)}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`json.${index}.day`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input
                      {...field}
                      className="p-1 ring-1 ring-black font-normal w-16"
                      placeholder="Day X"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`json.${index}.time`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input
                      {...field}
                      className="p-1 ring-1 ring-black font-normal w-16"
                      placeholder="00:00"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`json.${index}.placeName`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input
                      {...field}
                      className="p-1 ring-1 ring-black font-normal"
                      placeholder={t("placeName")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`json.${index}.latitude`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input
                      {...field}
                      className="p-1 ring-1 ring-black font-normal"
                      placeholder={t("latitude")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`json.${index}.longitude`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input
                      {...field}
                      className="p-1 ring-1 ring-black font-normal"
                      placeholder={t("longitude")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end items-center gap-4 col-span-2">
              {index > 0 && (
                <button type="button" onClick={() => move(index, index - 1)}>
                  {t("up")}
                </button>
              )}
              {index < fields.length - 1 && (
                <button type="button" onClick={() => move(index, index + 1)}>
                  {t("down")}
                </button>
              )}
              <button type="button" onClick={() => remove(index)}>
                {t("delete")}
              </button>
            </div>
          </div>
        ))}
        <div className="flex justify-end items-center gap-4 mt-4">
          <Button variant="outline" type="submit">
            {t("save")}
          </Button>
          <Button
            type="button"
            onClick={() =>
              append({
                date: new Date(),
                day: "",
                time: "",
                placeName: "",
                longitude: "",
                latitude: "",
              })
            }
          >
            {t("add")}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TravelPlanForm;
