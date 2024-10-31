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

import prisma from "@/lib/prisma";
import { formatDateToKR, formatDateToUTC } from "@/lib/time-formmater";
import {
  requestStatusObject,
  requestStatusObjectKR,
} from "@/definitions/request-details";
import { generateOrderNumber } from "@/lib/generateOrderNumber";
import { getLocale, getTranslations } from "next-intl/server";

export const dynamic = "force-dynamic";

const AdminUpdateRequestPage = async () => {
  const session = await verifySession();
  const t = await getTranslations("updateSchedule");
  const locale = await getLocale();
  if (!session || !session.userId) {
    return redirect("/login");
  }

  const requests = await prisma.request.findMany({
    where: {
      status: {
        in: ["editing", "initialEditing", "canceled"],
      },
      canceled: false,
    },
    include: {
      user: {
        omit: {
          password: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <div className="text-white max-w-screen-8xl mx-auto">
      <h1 className="text-2xl font-bold">{t("updateSchedule")}</h1>
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
            {requests.map((request, index) => (
              <TableRow key={request.id}>
                <TableCell>{generateOrderNumber(request.id)}</TableCell>
                <TableCell>{request.user.name}</TableCell>
                <TableCell>{request.user.email}</TableCell>
                <TableCell className="">{`${formatDateToKR(
                  formatDateToUTC(request.from) as unknown as Date
                )} ~ ${formatDateToKR(
                  formatDateToUTC(request.to) as unknown as Date
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
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminUpdateRequestPage;
