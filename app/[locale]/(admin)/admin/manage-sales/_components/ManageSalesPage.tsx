"use client";
import XLSX from "xlsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { BounceLoader } from "react-spinners";

import { useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import type { Request, User } from "@prisma/client";
import { generateOrderNumber } from "@/lib/generateOrderNumber";
import { dateToLocalFormatted } from "@/lib/time-formmater";
import { Link } from "@/i18n/routing";
import { SquareArrowOutUpRight } from "lucide-react";
import CurrencyFilterDropdown from "./CurrencyFilterDropdown";
import { useLocale, useTranslations } from "next-intl";

interface RequestWithUser extends Request {
  user: Omit<User, "password">;
}

const ManageSalesPage = () => {
  const t = useTranslations("manageSales");
  const locale = useLocale();
  const [queryType, setQueryType] = useState<"email" | "name">("email");
  const [query, setQuery] = useDebounceValue("", 1000);

  const { data: baseData, isLoading: baseIsLoading } = useQuery<
    RequestWithUser[]
  >({
    queryKey: ["sales"],
    queryFn: () => fetch(`/api/admin/sales`).then((data) => data.json()),
  });

  const { data: queryData, isLoading: queryIsLoading } = useQuery<
    RequestWithUser[]
  >({
    queryKey: ["sales", queryType, query],
    queryFn: () =>
      fetch(
        `/api/admin/sales/query?queryType=${queryType}&query=${encodeURIComponent(
          query
        )}`
      ).then((data) => data.json()),
    enabled: !!query,
  });

  const [currencyFilter, setCurrencyFilter] = useState<string | null>(null);

  const handleDownload = async () => {
    if (baseData && baseData.length === 0) {
      alert("검색된건이 없습니다.");
      return;
    }

    if (queryData && queryData.length === 0) {
      alert("검색된건이 없습니다.");
      return;
    }

    const fileName = `Sales.xls`;
    const data: string[][] =
      locale === "ko"
        ? [
            [
              "주문번호",
              "이름",
              "이메일",
              "결제 금액",
              "결제 통화",
              "결제 여뷰",
              "결제일",
            ],
          ]
        : [
            [
              "Order No.",
              "Name",
              "E-mail",
              "Paid Amount",
              "Currency",
              "Paid Status",
              "Payment Date",
            ],
          ];

    if (queryData && queryData.length > 0 && query) {
      queryData
        .filter((request) => {
          if (currencyFilter === null) return true;

          return request.currency === currencyFilter;
        })
        .forEach((request) => {
          data.push([
            generateOrderNumber(request.id),
            request.user.name,
            request.user.email,
            request.price?.toString() || "",
            request.currency || "",
            request.paid ? "Paid" : "Unpaid",
            request.paidAt
              ? dateToLocalFormatted(String(request.paidAt))
              : "결제 안됨",
          ]);
        });
      const book = XLSX.utils.book_new();
      const sheet = XLSX.utils.aoa_to_sheet(data);
      XLSX.utils.book_append_sheet(book, sheet, "sheet1");
      XLSX.writeFile(book, fileName);
      return;
    }

    if (baseData && baseData.length > 0) {
      baseData
        .filter((request) => {
          if (currencyFilter === null) return true;

          return request.currency === currencyFilter;
        })
        .forEach((request) => {
          data.push([
            generateOrderNumber(request.id),
            request.user.name,
            request.user.email,
            request.price?.toString() || "",
            request.currency || "",
            request.paid ? "Paid" : "Unpaid",
            request.paidAt
              ? dateToLocalFormatted(String(request.paidAt))
              : "결제 안됨",
          ]);
        });
      const book = XLSX.utils.book_new();
      const sheet = XLSX.utils.aoa_to_sheet(data);
      XLSX.utils.book_append_sheet(book, sheet, "sheet 1");
      XLSX.writeFile(book, fileName);
    }
  };

  return (
    <main>
      <div className="bg-white max-w-screen-8xl mx-auto rounded-md p-4 flex gap-2">
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

      {(queryIsLoading || baseIsLoading) && (
        <div className="flex justify-center items-center mt-12">
          <BounceLoader color="#FFF" />
        </div>
      )}
      <div className="bg-white max-w-screen-8xl mx-auto rounded-md p-4 flex flex-col gap-2 mt-12">
        <div className="flex justify-end items-center gap-4">
          <button type="button" onClick={handleDownload}>
            {t("downloadCSV")}
          </button>
          <CurrencyFilterDropdown
            applyCurrencyFilter={setCurrencyFilter}
            currencies={
              queryData
                ? (Array.from(
                    new Set(queryData?.map((request) => request.currency))
                  ) as string[])
                : (Array.from(
                    new Set(baseData?.map((request) => request.currency))
                  ) as string[])
            }
          />
        </div>
        {/* Below are the data derived from the query */}
        {!queryIsLoading && queryData && queryData.length > 0 && (
          <Table className="text-black ">
            <TableHeader className="">
              <TableRow className="">
                <TableHead className="w-[100px] font-bold">
                  {t("orderNo")}
                </TableHead>
                <TableHead className="font-bold">{t("name")}</TableHead>
                <TableHead className="font-bold">{t("email")}</TableHead>
                <TableHead className="font-bold">{t("paidAmount")}</TableHead>
                <TableHead className="font-bold">{t("paidStatus")}</TableHead>
                <TableHead className="font-bold">{t("paymentDate")}</TableHead>
                <TableHead className="font-bold"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className=" text-black max-h-[500px] overflow-y-auto">
              {queryData
                ?.filter((request) => {
                  if (currencyFilter === null) return true;

                  return request.currency === currencyFilter;
                })
                .map((request, index) => (
                  <TableRow key={request.id}>
                    <TableCell>{generateOrderNumber(request.id)}</TableCell>
                    <TableCell>{request.user.name}</TableCell>
                    <TableCell>{request.user.email}</TableCell>
                    <TableCell>
                      {request.price} {request.currency}
                    </TableCell>
                    <TableCell>
                      {request.paid ? t("paid") : t("unpaid")}
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
        )}
        {!baseIsLoading && !query && baseData && baseData.length > 0 && (
          <Table className="text-black ">
            <TableHeader className="">
              <TableRow className="">
                <TableHead className="w-[100px] font-bold">
                  {t("orderNo")}
                </TableHead>
                <TableHead className="font-bold">{t("name")}</TableHead>
                <TableHead className="font-bold">{t("email")}</TableHead>
                <TableHead className="font-bold">{t("paidAmount")}</TableHead>
                <TableHead className="font-bold">{t("paidStatus")}</TableHead>
                <TableHead className="font-bold">{t("paymentDate")}</TableHead>
                <TableHead className="font-bold"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className=" text-black max-h-[500px] overflow-y-auto">
              {baseData
                ?.filter((request) => {
                  if (currencyFilter === null) return true;

                  return request.currency === currencyFilter;
                })
                .map((request, index) => (
                  <TableRow key={request.id}>
                    <TableCell>{generateOrderNumber(request.id)}</TableCell>
                    <TableCell>{request.user.name}</TableCell>
                    <TableCell>{request.user.email}</TableCell>
                    <TableCell>
                      {request.price} {request.currency}
                    </TableCell>
                    <TableCell>
                      {request.paid ? t("paid") : t("unpaid")}
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
        )}
      </div>
    </main>
  );
};

export default ManageSalesPage;
