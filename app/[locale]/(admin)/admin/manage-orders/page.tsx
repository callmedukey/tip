import React from "react";
import prisma from "@/lib/prisma";
import { verifySession } from "@/actions/session";
import { Link, redirect } from "@/i18n/routing";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { generateOrderNumber } from "@/lib/generateOrderNumber";
import TogglePaidButton from "@/components/admin/manage-orders/TogglePaidButton";
import { SquareArrowOutUpRight } from "lucide-react";
import { dateToLocalFormatted } from "@/lib/time-formmater";

const ManageOrdersPage = async () => {
  const session = await verifySession();

  if (!session || session.accountType !== "Admin") {
    return redirect("/admin/login");
  }

  const requests = await prisma.request.findMany({
    where: {
      status: {
        not: "pending",
      },
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          id: true,
          moneySpent: true,
        },
      },
    },
  });

  return (
    <div className="text-white max-w-screen-8xl mx-auto">
      <h1 className="text-2xl font-bold">주문 관리</h1>
      <div className="bg-white rounded-md mt-12 relative text-black min-h-[50rem] max-h-[50rem] overflow-y-auto">
        <Table className="text-black">
          <TableHeader className="">
            <TableRow className="">
              <TableHead className="w-[100px] font-bold">주문번호</TableHead>
              <TableHead className="font-bold">이름</TableHead>
              <TableHead className="font-bold">이메일</TableHead>
              <TableHead className="font-bold">결제 금액</TableHead>
              <TableHead className="">결제 여뷰</TableHead>
              <TableHead className="">결제일</TableHead>
              <TableHead className=""></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className=" text-black max-h-[500px] overflow-y-auto">
            {requests.map((request, index) => (
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
                    ? dateToLocalFormatted(request.paidAt.toISOString())
                    : "결제 안됨"}
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
