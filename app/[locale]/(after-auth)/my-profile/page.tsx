import { verifySession } from "@/actions/session";
import UserBadge from "@/components/user/UserBadge";
import { Link, redirect } from "@/i18n/routing";
import prisma from "@/lib/prisma";
import ProfileForm from "./_components/ProfileForm";
import {
  Table,
  TableRow,
  TableHeader,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { generateOrderNumber } from "@/lib/generateOrderNumber";
import { SquareArrowOutUpRight } from "lucide-react";
import { dateToLocalFormatted } from "@/lib/time-formmater";
import { getTranslations } from "next-intl/server";

export const dynamic = "force-dynamic";

const page = async () => {
  const session = await verifySession();
  const t = await getTranslations("myProfile");
  if (!session || !session.userId) {
    return redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session?.userId,
    },
    omit: {
      password: true,
    },
  });

  const payments = await prisma.request.findMany({
    where: {
      userId: session?.userId,
      paid: true,
    },
    orderBy: {
      paidAt: "desc",
    },
  });

  if (!user) {
    return redirect("/login");
  }

  return (
    <main className="max-w-3xl mx-auto w-full px-4 py-32">
      <div className="bg-white/85 rounded-[2rem] px-4 flex flex-col items-center justify-center py-12">
        <h1 className="text-[1.875rem] font-normal">{t("profile")}</h1>
        <UserBadge
          userLevel={user?.userLevel ?? null}
          className="max-w-[10rem]"
        />
        <ProfileForm user={user as any} />
      </div>
      <div className="bg-white/85 rounded-[2rem] px-4 flex flex-col items-center justify-center py-12 mt-6">
        <h2 className="text-[1.875rem] font-normal mb-12">
          {t("paymentHistory")}
        </h2>
        <Table className="text-black ">
          <TableHeader className="">
            <TableRow className="">
              <TableHead className="w-[100px] font-bold">
                {t("orderNo")}
              </TableHead>
              <TableHead className="font-bold">{t("paidAmount")}</TableHead>
              <TableHead className="font-bold">{t("paymentDate")}</TableHead>
              <TableHead className="font-bold"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className=" text-black max-h-[500px] overflow-y-auto">
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{generateOrderNumber(payment.id)}</TableCell>
                <TableCell>
                  {payment.price?.toLocaleString()} {payment.currency}
                </TableCell>
                <TableCell>
                  {dateToLocalFormatted(payment.paidAt as any)}
                </TableCell>
                <TableCell>
                  <Link href={`/my-travel/details?id=${payment.id.toString()}`}>
                    <SquareArrowOutUpRight />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
            {payments.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  {t("noPayments")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </main>
  );
};

export default page;
