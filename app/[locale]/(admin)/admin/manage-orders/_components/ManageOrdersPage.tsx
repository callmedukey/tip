"use client";
import React, { useState } from "react";
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
import { dateToLocalFormatted } from "@/lib/time-formmater";
import { useQuery } from "@tanstack/react-query";
import { useDebounceValue } from "usehooks-ts";
import { User, Request } from "@prisma/client";
import { useTranslations } from "next-intl";

interface RequestWithUser extends Request {
  user: User;
}

const ManageOrdersPage = () => {
  const t = useTranslations("manageOrders");
  const [queryType, setQueryType] = useState<"email" | "name">("email");
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
    queryKey: ["manage-orders", queryType, query],
    queryFn: () =>
      fetch(
        `/api/admin/manage-orders/query?queryType=${queryType}&query=${encodeURIComponent(
          query
        )}`
      ).then((data) => data.json()),
    enabled: !!query,
  });

  return (
    <div className="text-white max-w-screen-8xl mx-auto">
      <h1 className="text-2xl font-bold">{t("manageOrders")}</h1>
      <div className="bg-white max-w-screen-8xl mx-auto rounded-md p-4 flex gap-2 text-black mt-6">
        <Select
          value={queryType}
          onValueChange={(value) => setQueryType(value as "email" | "name")}
        >
          <SelectTrigger className="w-[12rem] text-base">
            <SelectValue placeholder="검색 유형" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="email">{t("email")}</SelectItem>
            <SelectItem value="name">{t("name")}</SelectItem>
          </SelectContent>
        </Select>
        <input
          onChange={(e) => setQuery(e.currentTarget.value)}
          className="text-base flex-grow border rounded-md px-2"
          placeholder={t("searchTerm")}
        />
      </div>
      <div className="bg-white rounded-md mt-12 relative text-black min-h-[50rem] max-h-[50rem] overflow-y-auto">
        <Table className="text-black">
          <TableHeader className="">
            <TableRow className="">
              <TableHead className="w-[100px] font-bold">{t("orderNo")}</TableHead>
              <TableHead className="font-bold">{t("name")}</TableHead>
              <TableHead className="font-bold">{t("email")}</TableHead>
              <TableHead className="font-bold">{t("paidAmount")}</TableHead>
              <TableHead className="">{t("paidStatus")}</TableHead>
              <TableHead className="">{t("paymentDate")}</TableHead>
              <TableHead className=""></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className=" text-black max-h-[500px] overflow-y-auto">
            {(query ? queryData : baseData)?.map((request, index) => (
              <TableRow key={request.id}>
                <TableCell>{generateOrderNumber(request.id)}</TableCell>
                <TableCell>{request.user.name}</TableCell>
                <TableCell>{request.user.email}</TableCell>
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
