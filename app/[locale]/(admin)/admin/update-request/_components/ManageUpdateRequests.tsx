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
import { formatDateToKR, formatDateToUTC } from "@/lib/time-formmater";
import { useQuery } from "@tanstack/react-query";
import { useDebounceValue } from "usehooks-ts";
import { User, Request } from "@prisma/client";
import { requestStatusObject } from "@/definitions/request-details";
import { useTranslations, useLocale } from "next-intl";
import { Datepicker } from "flowbite-react";
import { requestStatusObjectKR } from "@/definitions/request-details";

interface RequestWithUser extends Request {
  user: User;
}

const ManageUpdateRequests = () => {
  const t = useTranslations("manageUpdateRequests");
  const locale = useLocale();
  const [queryType, setQueryType] = useState<"email" | "name" | "start">(
    "email"
  );
  const [query, setQuery] = useDebounceValue("", 1000);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  const { data: baseData, isLoading: baseIsLoading } = useQuery<
    RequestWithUser[]
  >({
    queryKey: ["manage-update-requests"],
    queryFn: () =>
      fetch(`/api/admin/manage-update-requests`).then((data) => data.json()),
  });

  const { data: queryData, isLoading: queryIsLoading } = useQuery<
    RequestWithUser[]
  >({
    queryKey: ["manage-update-requests", queryType, query, selectedMonth],
    queryFn: () =>
      fetch(
        `/api/admin/manage-update-requests/query?queryType=${queryType}&query=${encodeURIComponent(
          query
        )}`
      ).then((data) => data.json()),
    enabled: !!query || !!selectedMonth,
  });

  useEffect(() => {
    setQuery("");
  }, [queryType, setQuery]);

  return (
    <div className="text-white max-w-screen-8xl mx-auto">
      <h1 className="text-2xl font-bold">{t("manageUpdateRequests")}</h1>
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
          </SelectContent>
        </Select>

        {queryType === "start" ? (
          <Datepicker
            placeholder={t("start")}
            value={selectedMonth ? new Date(selectedMonth) : null}
            onChange={(e) => setSelectedMonth(e as unknown as string)}
            className="w-full"
            theme={{
              root: {
                base: "relative ",
                input: {
                  base: "bg-transparent",
                  field: {
                    base: "bg-transparent",
                    icon: {
                      base: "hidden",
                    },
                    input: {
                      base: "!bg-transparent !border-b-[0.5px] !placeholder-formText !border-formText !w-full !shadow-none !focus:ring-transparent !outline-0 !focus:outline-none !pl-0 !rounded-none !text-base",
                    },
                  },
                },
              },
            }}
          />
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
              <TableHead className="font-bold">{t("date")}</TableHead>
              <TableHead className="font-bold">{t("type")}</TableHead>
              <TableHead className=""></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className=" text-black max-h-[500px] overflow-y-auto">
            {queryData && queryData.length > 0
              ? queryData.map((request, index) => (
                  <TableRow key={request.id}>
                    <TableCell>{generateOrderNumber(request.id)}</TableCell>
                    <TableCell>{request.user.name}</TableCell>
                    <TableCell>{request.user.email}</TableCell>
                    <TableCell className="">{`${formatDateToKR(
                      formatDateToUTC(new Date(request.from)) as unknown as Date
                    )} ~ ${formatDateToKR(
                      formatDateToUTC(new Date(request.to)) as unknown as Date
                    )}`}</TableCell>
                    <TableCell>
                      {locale === "ko"
                        ? requestStatusObjectKR[request.status]
                        : requestStatusObject[request.status]}
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/admin/planner?id=${request.id}`}
                        className="bg-black text-white py-1 px-2 rounded-md"
                      >
                        {t("planner")}
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              : null}
            {!query && baseData && baseData.length > 0
              ? baseData.map((request, index) => (
                  <TableRow key={request.id}>
                    <TableCell>{generateOrderNumber(request.id)}</TableCell>
                    <TableCell>{request.user.name}</TableCell>
                    <TableCell>{request.user.email}</TableCell>
                    <TableCell className="">{`${formatDateToKR(
                      formatDateToUTC(new Date(request.from)) as unknown as Date
                    )} ~ ${formatDateToKR(
                      formatDateToUTC(new Date(request.to)) as unknown as Date
                    )}`}</TableCell>
                    <TableCell>
                      {locale === "ko"
                        ? requestStatusObjectKR[request.status]
                        : requestStatusObject[request.status]}
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/admin/planner?id=${request.id}`}
                        className="bg-black text-white py-1 px-2 rounded-md"
                      >
                        {t("planner")}
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ManageUpdateRequests;
