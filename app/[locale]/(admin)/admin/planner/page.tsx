import AdminQuoteForm from "@/components/forms/AdminQuoteForm";
import AdminRequestCancelButton from "@/components/forms/AdminRequestCancelButton";
import TravelPlanForm from "@/components/forms/TravelPlanForm";
import TravelSummaryForm from "@/components/forms/TravelSummaryForm";
import { packageOptionsKR } from "@/definitions/packages";
import { SummaryArray, TravelPlanArray } from "@/definitions/request-details";
import { generateOrderNumber } from "@/lib/generateOrderNumber";
import prisma from "@/lib/prisma";
import { formatDateToKR, formatDateToUTC } from "@/lib/time-formmater";

const AdminPlannerPage = async ({
  searchParams,
}: {
  searchParams: { id: string };
}) => {
  const orderId = searchParams.id;

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
      editRequests: true,
    },
  });

  if (!order) {
    return (
      <div className="text-white text-center text-2xl font-bold">
        주문을 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="max-w-screen-8xl mx-auto text-white font-medium">
      <h1 className="text-2xl font-bold text-center">여행 플래너</h1>
      <main className="bg-white/85 mt-12 p-4 text-black rounded-md overflow-y-auto">
        <div className="flex gap-2 mt-4">
          <div>주문번호:</div>
          <div>{generateOrderNumber(order.id)}</div>
        </div>
        <div className="flex gap-2 mt-4">
          <div>이름:</div>
          <div>{order.user.name}</div>
        </div>
        <div className="flex gap-2 mt-4">
          <div>이메일:</div>
          <div>{order.user.email}</div>
        </div>
        <div className="flex gap-2 mt-4">
          <div>여행스타일:</div>
          <div>{order.user?.extra ?? "lorem*30"}</div>
        </div>
        <div className="mt-12">
          <h2 className="text-xl font-bold">수정 요청 사항</h2>
        </div>
        {order.editRequests.map((editRequest) => (
          <div
            key={editRequest.id}
            className="mt-6 bg-gray-300 p-2 rounded-md max-w-md"
          >
            {editRequest.content}
          </div>
        ))}
        {order.editRequests.length === 0 && (
          <div className="mt-6 bg-gray-300 p-2 rounded-md max-w-md">
            수정 요청 사항이 없습니다.
          </div>
        )}
        <div className="mt-12">
          <h2 className="text-xl font-bold underline underline-offset-4">
            선택 사항
          </h2>
        </div>
        <div className="flex gap-2 mt-4">
          <div>날짜:</div>
          <div>
            {formatDateToKR(formatDateToUTC(order.from) as unknown as Date)} ~{" "}
            {formatDateToKR(formatDateToUTC(order.to) as unknown as Date)}
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <div>여행스타일:</div>
          <div>{order.user?.extra ?? "lorem*30"}</div>
        </div>
        <div className="flex gap-2 mt-4">
          <div>도시:</div>
          <div>{order.city}</div>
        </div>
        <div className="flex gap-2 mt-4">
          <div>인원:</div>
          <div>
            성인 {order.adults} / 유아 {order.infants}
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <div>유형:</div>
          <div>{order.purpose === "business" ? "사업" : "여행"}</div>
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
            <li>선택 옵션 없음</li>
          ) : null}
          {order.options?.map((option, index) => (
            <li className="" key={`${option}-${index}`}>
              {packageOptionsKR[option as keyof typeof packageOptionsKR]}
            </li>
          ))}
        </ul>
        <div className="font-bold">그 외 요청</div>
        <div className="max-w-md bg-gray-300  p-2 rounded-md">
          {order.extra && order.extra !== "" ? order.extra : "없음"}
        </div>
        <div className="mt-12">
          <h2 className="text-xl font-bold">여행 개요</h2>
        </div>
        <TravelSummaryForm summary={order.summary as SummaryArray} />
        <div className="mt-12">
          <h2 className="text-xl font-bold">여행 일정</h2>
        </div>
        <TravelPlanForm plan={order.travelPlan as unknown as TravelPlanArray} />
        <div className="mt-12">
          <h2 className="text-xl font-bold">견적</h2>
        </div>
        <AdminQuoteForm />
        <div className="mt-12">
          <AdminRequestCancelButton />
        </div>
      </main>
    </div>
  );
};

export default AdminPlannerPage;
