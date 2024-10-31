import { verifySession } from "@/actions/session";
import { redirect } from "@/i18n/routing";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/prisma";
export const dynamic = "force-dynamic";
import ToggleActiveCouponButton from "./_components/ToggleActiveCouponButton";
import CreateNewCouponDialog from "./_components/CreateNewCouponDialog";
import { getTranslations } from "next-intl/server";

const page = async () => {
  const session = await verifySession();
  const t = await getTranslations("manageCoupons");

  if (!session || session.accountType !== "Admin" || !session.userId) {
    return redirect("/login");
  }

  const coupons = await prisma.coupon.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          requests: true,
        },
      },
    },
  });

  return (
    <div className="text-white max-w-screen-8xl mx-auto">
      <h1 className="text-2xl font-bold">{t("manageCoupons")}</h1>
      <div className="bg-white rounded-md mt-12 relative text-black min-h-[50rem] max-h-[50rem] overflow-y-auto">
        <div className="flex justify-end">
          <CreateNewCouponDialog />
        </div>
        <Table className="text-black">
          <TableHeader className="">
            <TableRow className="">
              <TableHead className="w-[100px] font-bold">{t("number")}</TableHead>
              <TableHead className="font-bold">{t("couponCode")}</TableHead>
              <TableHead className="font-bold">{t("description")}</TableHead>
              <TableHead className="font-bold">{t("used")}</TableHead>
              <TableHead className="font-bold">{t("status")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-black max-h-[500px] overflow-y-auto">
            {coupons.map((coupon, index) => (
              <TableRow key={coupon.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{coupon.code}</TableCell>
                <TableCell>{coupon.description}</TableCell>
                <TableCell>{coupon._count.requests}</TableCell>
                <TableCell>
                  <ToggleActiveCouponButton
                    active={coupon.active}
                    couponId={coupon.id}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default page;
