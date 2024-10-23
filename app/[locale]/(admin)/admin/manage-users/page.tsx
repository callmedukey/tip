import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/prisma";
import { verifySession } from "@/actions/session";
import { Link, redirect } from "@/i18n/routing";
import { formatDateToKR } from "@/lib/time-formmater";
import { userLevelObject } from "@/lib/parseUserLevel";
import { SquareArrowOutUpRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UpdateUserLevelButton from "@/components/admin-update/updateUserLevelButton";
import UpdateMoneySpentButton from "@/components/admin-update/updateMoneySpentButton"; // Import the component
import { UserLevel } from "@prisma/client";
import UpdateUserLevel from "./_components/UpdateUserLevel";

const Page = async () => {
  const session = await verifySession();
  if (!session || !session.userId || session.accountType !== "Admin") {
    return redirect("/login");
  }

  const users = await prisma.user.findMany({
    where: {},
    select: {
      name: true,
      id: true,
      email: true,
      moneySpent: true,
      userLevel: true,
      gender: true,
      birthday: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="text-white max-w-screen-8xl mx-auto">
      <h1 className="text-2xl font-bold">회원 관리</h1>
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
            {users.map((user) => (
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

export default Page;
