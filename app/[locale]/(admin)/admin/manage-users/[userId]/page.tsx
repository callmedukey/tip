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
import { Link, redirect } from "@/i18n/routing";
import { verifySession } from "@/actions/session";
import { dateToLocalFormatted, formatDateToKR } from "@/lib/time-formmater";
import { userLevelObject } from "@/lib/parseUserLevel";
import UpdateAccountType from "../_components/UpdateAccountType";
import TogglePaidButton from "@/components/admin/manage-orders/TogglePaidButton";
import { SquareArrowOutUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

export const dynamic = "force-dynamic";

const ManageSingelUserPage = async ({
  params: { userId },
}: {
  params: {
    userId: string;
  };
}) => {
  const session = await verifySession();
  const t = await getTranslations("manageSingleUser");
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
      <div className="flex justify-end mb-6">
        <UpdateAccountType accountType={user.accountType} userId={userId} />
      </div>
      <div className="bg-white text-black p-4 rounded-md">
        <ul className="space-y-4">
          <li>
            <p>
              {t("name")}:{user.name}
            </p>
          </li>

          <li>
            <p>
              {t("email")}: {user.email}{" "}
            </p>
          </li>

          <li>
            <p>
              {t("phoneNumber")}: {user.phoneNumber}
            </p>
          </li>

          <li>
            <p>
              {t("dob")}: {formatDateToKR(user.birthday)}{" "}
            </p>
          </li>

          <li>
            <p>
              {t("gender")}: {user.gender}
            </p>
          </li>

          {user?.extra &&
            typeof user.extra === "string" &&
            user.extra.length > 0 && (
              <li>
                <p>
                  {t("extraInfo")}: {user.extra}{" "}
                </p>
              </li>
            )}

          {user?.businessNumber &&
            typeof user.businessNumber === "string" &&
            user.businessNumber.length > 0 && (
              <li>
                <p>
                  {t("businessNumber")}: {user.businessNumber}{" "}
                </p>
              </li>
            )}
          <li>
            <p>
              {t("accountType")}: {user.accountType}
            </p>
          </li>

          <li>
            <p>
              {t("moneySpent")}: {user.moneySpent}
            </p>
          </li>

          <li>
            <p>
              {t("accountLevel")}: {userLevelObject[user.userLevel]}{" "}
            </p>
          </li>
        </ul>
        <div className="mt-4">
          <div>{t("extraInfo")}:</div>
          <div className="bg-gray-300  p-2 rounded-md">
            {user.extra?.trim() ?? "없음"}
          </div>
        </div>
      </div>
      <div className="bg-white rounded-md mt-12 relative text-black min-h-[50rem] max-h-[50rem] overflow-y-auto">
        <Table className="text-black">
          <TableHeader className="">
            <TableRow className="">
              <TableHead className="w-[100px] font-bold">
                {t("orderNo")}
              </TableHead>
              <TableHead className="font-bold">{t("destination")}</TableHead>
              <TableHead className="font-bold">{t("paidAmount")}</TableHead>
              <TableHead className="">{t("paidStatus")}</TableHead>
              <TableHead className="">{t("paymentDate")}</TableHead>
              <TableHead className=""></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className=" text-black max-h-[500px] overflow-y-auto">
            {user.requests.map((request, index) => (
              <TableRow key={request.id}>
                <TableCell>{generateOrderNumber(request.id)}</TableCell>
                <TableCell>{request.city.join(", ")}</TableCell>
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
                    : t("notPaid")}
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
      .
    </div>
  );
};

export default ManageSingelUserPage;
