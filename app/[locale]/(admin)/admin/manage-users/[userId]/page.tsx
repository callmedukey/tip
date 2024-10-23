import React from "react";
import prisma from "@/lib/prisma";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { generateOrderNumber } from "@/lib/generateOrderNumber";
import { redirect } from "@/i18n/routing";
import { verifySession } from "@/actions/session";
import { formatDateToKR } from "@/lib/time-formmater";
import { userLevelObject } from "@/lib/parseUserLevel";

export const dynamic = "force-dynamic";

const ManageSingelUserPage = async ({
  params: { userId },
}: {
  params: {
    userId: string;
  };
}) => {
  const session = await verifySession();
  if (!session || !session.userId || session.accountType !== "Admin") {
    return redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      requests: {
        orderBy: { createdAt: "desc" },
      },
    },
    omit: { password: true },
  });
  if (!user) {
    return redirect("/admin/manage-users");
  }

  return (
    <div className="text-white max-w-screen-8xl mx-auto">
      <div className="bg-white text-black p-4 rounded-md">
        <ul className="space-y-4">
          <li>
            <p>Name:{user.name}</p>
          </li>

          <li>
            <p>Email: {user.email} </p>
          </li>

          <li>
            <p>Phone Number: {user.phoneNumber}</p>
          </li>

          <li>
            <p>Birthday: {formatDateToKR(user.birthday)} </p>
          </li>

          <li>
            <p>Gender: {user.gender}</p>
          </li>

          {user?.extra &&
            typeof user.extra === "string" &&
            user.extra.length > 0 && (
              <li>
                <p>Extra: {user.extra} </p>
              </li>
            )}

          {user?.businessNumber &&
            typeof user.businessNumber === "string" &&
            user.businessNumber.length > 0 && (
              <li>
                <p>Business Number: {user.businessNumber} </p>
              </li>
            )}
          <li>
            <p>Account type: {user.accountType}</p>
          </li>

          <li>
            <p>Money spent: {user.moneySpent}</p>
          </li>

          <li>
            <p>User Level : {userLevelObject[user.userLevel]} </p>
          </li>
        </ul>
      </div>
      <div className="bg-white rounded-md mt-12 relative text-black min-h-[50rem] max-h-[50rem] overflow-y-auto">
        <Table className="text-black">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] font-bold">Requests</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {user?.requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{generateOrderNumber(request.id)} </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{request.price}</TableCell>
                <TableCell> {request.paid} </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      .
    </div>
  );
};

export default ManageSingelUserPage;
