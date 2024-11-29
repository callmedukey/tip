import { verifySession } from "@/actions/session";
import AdminQuoteForm from "@/components/forms/AdminQuoteForm";
import AdminRequestCancelButton from "@/components/forms/AdminRequestCancelButton";
import TravelPlanForm from "@/components/forms/TravelPlanForm";
import TravelSummaryForm from "@/components/forms/TravelSummaryForm";
import { packageOptionsKR } from "@/definitions/packages";
import { SummaryArray, TravelPlanArray } from "@/definitions/request-details";
import { redirect } from "@/i18n/routing";
import { generateOrderNumber } from "@/lib/generateOrderNumber";
import prisma from "@/lib/prisma";
import { formatDateToKR, formatDateToUTC } from "@/lib/time-formmater";
import PlannerSaveAndSend from "./_components/PlannerSaveAndSend";
import AdminFileUploads from "./_components/AdminFileUploads";
import AdminRequestNote from "./_components/AdminRequestNote";
import { getTranslations } from "next-intl/server";
import DownloadWrapper from "./_components/DownloadWrapper";

export const dynamic = "force-dynamic";

const AdminPlannerPage = async ({
  searchParams,
}: {
  searchParams: { id: string };
}) => {
  const session = await verifySession();
  const t = await getTranslations("adminPlanner");
  if (!session || !session.userId || session.accountType !== "Admin") {
    return redirect("/login");
  }
  const orderId = searchParams.id;

  if (!orderId) {
    return redirect("/admin/new-request");
  }

  const order = await prisma.request.findUnique({
    where: {
      id: +orderId,
    },
    include: {
      user: {
        omit: {
          password: true,
        },
      },
      coupon: true,
      editRequests: true,
      uploads: true,
    },
  });

  if (!order) {
    return (
      <div className="text-white text-center text-2xl font-bold">
        주문을 찾을 수 없습니다.
      </div>
    );
  }
  console.log(typeof order.from, typeof order.to);
  return (
    <div className="max-w-screen-8xl mx-auto text-white font-medium">
      <h1 className="text-2xl font-bold text-center">{t("planner")}</h1>
      <main className="bg-white/85 mt-12 p-4 text-black rounded-md overflow-y-auto">
        <div className="flex gap-2 mt-4">
          <div>{t("orderNo")}:</div>
          <div>{generateOrderNumber(order.id)}</div>
        </div>
        <div className="flex gap-2 mt-4">
          <div>{t("name")}:</div>
          <div>{order.user.name}</div>
        </div>
        <div className="flex gap-2 mt-4">
          <div>{t("email")}:</div>
          <div>{order.user.email}</div>
        </div>
        <div className="flex gap-2 mt-4">
          <div>{t("accountTravelStyle")}:</div>
        </div>
        <div className="mt-2 bg-gray-300 p-2 rounded-md max-w-md">
          {order.user.extra && order.user.extra !== ""
            ? order.user.extra
            : t("noAccountTravelStyle")}
        </div>
        <div className="mt-12">
          <h2 className="text-xl font-bold">{t("editRequestTitle")}</h2>
        </div>
        {order.editRequests.map((editRequest) => (
          <div key={editRequest.id}>
            <div className="mt-6 bg-gray-300 p-2 rounded-md max-w-md">
              {editRequest.content}
            </div>
            <span className="text-sm text-gray-500 ml-auto mr-0 block">
              {formatDateToKR(
                formatDateToUTC(editRequest.createdAt) as unknown as Date
              )}
            </span>
          </div>
        ))}
        {order.editRequests.length === 0 && (
          <div className="mt-6 bg-gray-300 p-2 rounded-md max-w-md">
            {t("noEditRequest")}
          </div>
        )}
        <div className="mt-12">
          <h2 className="text-xl font-bold underline underline-offset-4">
            {t("selectedOptions")}
          </h2>
        </div>
        <div className="flex gap-2 mt-4">
          <div>{t("date")}:</div>
          <div>
            {formatDateToKR(order.from)} ~ {formatDateToKR(order.to)}
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <div>{t("orderTravelStyle")}:</div>
        </div>
        <div className="mt-2 bg-gray-300 p-2 rounded-md max-w-md">
          {order.extra && order.extra !== ""
            ? order.extra
            : t("noOrderTravelStyle")}
        </div>
        <div className="flex gap-2 mt-4">
          <div>{t("city")}:</div>
          <div>{order.city.join(", ")}</div>
        </div>
        <div className="flex gap-2 mt-4">
          <div>{t("persons")}:</div>
          <div>
            {t("adults")} {order.adults} / {t("infants")} {order.infants}
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <div>{t("type")}:</div>
          <div>
            {order.purpose === "business" ? t("business") : t("travel")}
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-xl font-bold underline underline-offset-4 flex gap-12">
            {order.packageType === "custom"
              ? "Custom 패키지"
              : "All Inclusive 패키지"}
          </h2>
        </div>
        <ul className="list-disc list-inside py-4">
          {!order.options || order.options.length === 0 ? (
            <li>{t("noSelectedOptions")}</li>
          ) : null}
          {order.options?.map((option, index) => (
            <li className="" key={`${option}-${index}`}>
              {packageOptionsKR[option as keyof typeof packageOptionsKR]}
            </li>
          ))}
        </ul>
        <div className="font-bold">{t("etcRequests")}</div>
        <div className="max-w-md bg-gray-300  p-2 rounded-md">
          {order.extra && order.extra !== "" ? order.extra : t("noEtcRequests")}
        </div>
        <div className="font-bold mt-8">{t("budget")}</div>
        <div className="max-w-md bg-gray-300  p-2 rounded-md">
          {order.budget && order.budget !== "" ? order.budget : t("noBudget")}
        </div>
        <div className="font-bold mt-8">{t("startCity")}</div>
        <div className="max-w-md bg-gray-300  p-2 rounded-md">
          {order?.startCity && order?.startCity !== "" ? order.startCity : "-"}
        </div>
        <div className="mt-12">
          <h2 className="text-xl font-bold">{t("travelSummary")}</h2>
        </div>
        <TravelSummaryForm summary={order.summary as SummaryArray} />
        {order.summary && <DownloadWrapper order={order} />}
        <div className="mt-12">
          <h2 className="text-xl font-bold">{t("travelPlan")}</h2>
        </div>
        <TravelPlanForm plan={order.travelPlan as unknown as TravelPlanArray} />
        <AdminRequestNote requestId={order.id} note={order.adminNotes} />
        <PlannerSaveAndSend paid={order.paid} />
        <div className="mt-12">
          <h2 className="text-xl font-bold">{t("quote")}</h2>
        </div>
        {order.coupon && (
          <div className="mt-4">
            <div className="flex gap-2">
              <div>{t("coupon")}:</div>
              <div>{order.coupon.code}</div>
            </div>
            <div className="max-w-md">{order.coupon.description}</div>
          </div>
        )}
        <AdminQuoteForm
          price={order.price}
          currency={order.currency}
          paymentLink={order.quoteLink}
        />
        <div className="mt-12">
          <p className="text-lg font-bold">{t("fileUpload")}</p>
          <div className="mt-4">
            <AdminFileUploads requestId={order.id} uploads={order.uploads} />
          </div>
        </div>
        <div className="mt-12">
          <AdminRequestCancelButton />
        </div>
      </main>
    </div>
  );
};

export default AdminPlannerPage;
