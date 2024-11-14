"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "@/i18n/routing";

import { generateOrderNumber } from "@/lib/generateOrderNumber";
import TogglePaidButton from "@/components/admin/manage-orders/TogglePaidButton";
import { SquareArrowOutUpRight } from "lucide-react";
import {
  dateToLocalFormatted,
  dateToLocalFormattedWithoutTime,
} from "@/lib/time-formmater";
import { useQuery } from "@tanstack/react-query";
import { useDebounceValue } from "usehooks-ts";
import { User, Request } from "@prisma/client";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { enUS } from "date-fns/locale";
import { ko } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import CalendarIcon from "@/public/icons/Calendar.svg";
import PlaneIcon from "@/public/icons/plane.svg";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";

interface RequestWithUser extends Request {
  user: User;
}

const ManageOrdersPage = () => {
  const t = useTranslations("manageOrders");
  const locale = useLocale();
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [queryType, setQueryType] = useState<"email" | "name" | "start">(
    "email"
  );
  const [query, setQuery] = useDebounceValue("", 1000);

  const { data: baseData, isLoading: baseIsLoading } = useQuery<
    RequestWithUser[]
  >({
    queryKey: ["manage-orders"],
    queryFn: () =>
      fetch(`/api/admin/manage-orders`).then((data) => data.json()),
  });

  const { data: queryData, isLoading: queryIsLoading } = useQuery<
    RequestWithUser[]
  >({
    queryKey: ["manage-orders", queryType, query, date],
    queryFn: () =>
      fetch(
        `/api/admin/manage-orders/query?queryType=${queryType}&query=${encodeURIComponent(
          query
        )}&fromDate=${encodeURIComponent(
          date?.from?.toISOString() ?? ""
        )}&toDate=${encodeURIComponent(date?.to?.toISOString() ?? "")}`
      ).then((data) => data.json()),
    enabled: !!query || !!(date && date.from && date.to),
  });

  useEffect(() => {
    setQuery("");
  }, [queryType, setQuery]);

  return (
    <div className="text-white max-w-screen-8xl mx-auto">
      <h1 className="text-2xl font-bold">{t("manageOrders")}</h1>
      <div className="bg-white max-w-screen-8xl mx-auto rounded-md p-4 flex gap-2 text-black mt-6">
        <Select
          value={queryType}
          onValueChange={(value) =>
            setQueryType(value as "email" | "name" | "start")
          }
        >
          <SelectTrigger className="w-[12rem] text-base">
            <SelectValue placeholder="검색 유형" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="email">{t("email")}</SelectItem>
            <SelectItem value="name">{t("name")}</SelectItem>
            <SelectItem value="start">{t("start")}</SelectItem>
          </SelectContent>
        </Select>

        {queryType === "start" ? (
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
                  {date?.from ? (
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
                    {date?.to ? format(date.to, "yyyy-MM-dd") : t("endDate")}
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
        ) : (
          <input
            onChange={(e) => setQuery(e.currentTarget.value)}
            className="text-base flex-grow border rounded-md px-2"
            placeholder={t("searchTerm")}
          />
        )}
      </div>
      <div className="bg-white rounded-md mt-12 relative text-black min-h-[50rem] max-h-[50rem] overflow-y-auto">
        <Table className="text-black">
          <TableHeader className="">
            <TableRow className="">
              <TableHead className="w-[100px] font-bold">
                {t("orderNo")}
              </TableHead>
              <TableHead className="font-bold">{t("name")}</TableHead>
              <TableHead className="font-bold">{t("email")}</TableHead>
              <TableHead className="font-bold">{t("travelDate")}</TableHead>
              <TableHead className="font-bold">{t("paidAmount")}</TableHead>
              <TableHead className="">{t("paidStatus")}</TableHead>
              <TableHead className="">{t("paymentDate")}</TableHead>
              <TableHead className=""></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className=" text-black max-h-[500px] overflow-y-auto">
            {(queryData ? queryData : baseData)?.map((request, index) => (
              <TableRow key={request.id}>
                <TableCell>{generateOrderNumber(request.id)}</TableCell>
                <TableCell>{request.user.name}</TableCell>
                <TableCell>{request.user.email}</TableCell>
                <TableCell>
                  {dateToLocalFormattedWithoutTime(String(request.from))} -{" "}
                  {dateToLocalFormattedWithoutTime(String(request.to))}
                </TableCell>
                <TableCell>
                  {request.price} {request.currency}
                </TableCell>
                <TableCell>
                  <TogglePaidButton
                    id={request.id.toString()}
                    paidStatus={request.paid}
                  />
                </TableCell>
                <TableCell>
                  {request.paidAt
                    ? dateToLocalFormatted(String(request.paidAt))
                    : t("unpaid")}
                </TableCell>
                <TableCell>
                  <Link href={`/admin/planner?id=${request.id.toString()}`}>
                    <SquareArrowOutUpRight />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ManageOrdersPage;
