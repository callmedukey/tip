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
import { formatDateToKR } from "@/lib/time-formmater";
import { SquareArrowOutUpRight } from "lucide-react";
import UpdateUserLevel from "./UpdateUserLevel";
import { useDebounceValue } from "usehooks-ts";
import type { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@/i18n/routing";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ManageUsersPage = () => {
  const [queryType, setQueryType] = useState<"email" | "name">("email");
  const [query, setQuery] = useDebounceValue("", 1000);

  const { data: baseData, isLoading: baseIsLoading } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => fetch(`/api/admin/manage-users`).then((data) => data.json()),
  });

  const { data: queryData, isLoading: queryIsLoading } = useQuery<User[]>({
    queryKey: ["users", queryType, query],
    queryFn: () =>
      fetch(
        `/api/admin/manage-users/query?queryType=${queryType}&query=${encodeURIComponent(
          query
        )}`
      ).then((data) => data.json()),
    enabled: !!query,
  });

  return (
    <div className="text-white max-w-screen-8xl mx-auto">
      <h1 className="text-2xl font-bold">회원 관리</h1>
      <div className="bg-white max-w-screen-8xl mx-auto rounded-md p-4 flex gap-2 text-black mt-6">
        <Select
          value={queryType}
          onValueChange={(value) => setQueryType(value as "email" | "name")}
        >
          <SelectTrigger className="w-[12rem] text-base">
            <SelectValue placeholder="검색 유형" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="email">이메일</SelectItem>
            <SelectItem value="name">이름</SelectItem>
          </SelectContent>
        </Select>
        <input
          onChange={(e) => setQuery(e.currentTarget.value)}
          className="text-base flex-grow border rounded-md px-2"
          placeholder="검색어"
        />
      </div>
      <div className="bg-white rounded-md mt-12 relative text-black min-h-[50rem] max-h-[50rem] overflow-y-auto">
        <Table className="text-black">
          <TableHeader className="">
            <TableRow className="">
              <TableHead className="w-[100px] font-bold">이름</TableHead>
              <TableHead className="font-bold">이메일</TableHead>
              <TableHead className="font-bold">회원 등급</TableHead>
              <TableHead className="font-bold">개인 정보</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {query &&
              queryData &&
              queryData.length > 0 &&
              queryData?.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="min-w-[20rem]">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <UpdateUserLevel
                      userLevel={user.userLevel}
                      userId={user.id}
                    />
                  </TableCell>
                  <TableCell>
                    {user.gender} {formatDateToKR(user.birthday)}{" "}
                  </TableCell>
                  <TableCell>
                    <Link href={`/admin/manage-users/${user.id}`}>
                      <SquareArrowOutUpRight />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            {!query &&
              baseData &&
              baseData.length > 0 &&
              baseData?.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="min-w-[20rem]">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <UpdateUserLevel
                      userLevel={user.userLevel}
                      userId={user.id}
                    />
                  </TableCell>
                  <TableCell>
                    {user.gender} {formatDateToKR(user.birthday)}{" "}
                  </TableCell>
                  <TableCell>
                    <Link href={`/admin/manage-users/${user.id}`}>
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

export default ManageUsersPage;
