"use client";
import { generateOrderNumber } from "@/lib/generateOrderNumber";
import BlackLogo from "@/public/black-logo.png";
import { dateToLocalFormattedWithoutTime } from "@/lib/time-formmater";
import Image from "next/image";
import type { Request, User } from "@prisma/client";
import { useRef } from "react";

interface RequestWithUser extends Request {
  user: Omit<User, "password">;
}

const InvoicePrintPage = ({
  locale,
  request,
}: {
  locale: string;
  request: RequestWithUser;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (ref.current) {
      window.print();
    }
  };
  return (
    <article className="bg-white rounded-[1rem] p-8" ref={ref}>
      <div className="flex items-end justify-between">
        <Image
          src={BlackLogo}
          height={611}
          width={1067}
          alt="invoice logo"
          className="w-24"
        />
        <div>
          <h1 className="font-inter text-right">Travel in your pocket</h1>
          <p className="text-xs">https://travelinyourpocket.com</p>
        </div>
      </div>
      <div className="flex flex-col mt-12">
        <div className="flex gap-8">
          <div className="w-32 font-semibold">
            {locale === "en" ? "Order Number" : "주문번호"}
          </div>
          <div>{generateOrderNumber(request.id)}</div>
        </div>
        <div className="flex gap-8">
          <div className="w-32 font-semibold">
            {locale === "en" ? "Order Date" : "주문일자"}
          </div>
          <div>
            {dateToLocalFormattedWithoutTime(
              request.createdAt as unknown as string
            )}
          </div>
        </div>
      </div>
      <div className="mt-12 flex sm:flex-row flex-col">
        <div className="w-full sm:w-1/2 flex-1 sm:max-w-[50%]">
          <div className="font-semibold">
            {locale === "en" ? "Order Summary" : "주문 요약"}
          </div>
          <div>Destination Cities: {request.city.join(", ")}</div>
          <div>
            Persons: {request.adults} Adults, {request.infants} Infants
          </div>
          <div>
            Package Type:{" "}
            {request.packageType === "all_inclusive"
              ? "All Inclusive"
              : "Custom"}
          </div>
        </div>
        <div className="w-full sm:w-1/2 flex-1 mt-8 sm:mt-0">
          <div>
            <div className="font-semibold">
              {locale === "en" ? "Invoiced To" : "주문자 정보"}
            </div>
            <div>
              {request.user.name}
              <br />
              {request.user.email}
              <br />
              {request.user.phoneNumber}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 border-y border-black">
        <div className="flex font-semibold border-b border-gray-300 py-2">
          <div className="min-w-[60%]">
            {locale === "en" ? "Order Details" : "주문 내역"}
          </div>
          <div className="min-w-[20%]">
            {locale === "en" ? "Price" : "가격"}
          </div>
          <div className="min-w-[20%] text-right">
            {locale === "en" ? "Currency" : "화폐"}
          </div>
        </div>
        <div className="flex py-2 border-b border-gray-300">
          <div className="min-w-[60%]">
            {locale === "en" ? "Destination City" : "목적지 도시"}
          </div>
          <div className="min-w-[20%]">{request.price?.toLocaleString()}</div>
          <div className="min-w-[20%] text-right">{request.currency}</div>
        </div>
        <div className="flex py-2 bg-gray-200">
          <div className="min-w-[60%]"></div>
          <div className="min-w-[20%]">Total Price:</div>
          <div className="min-w-[20%] text-right">
            {request.price?.toLocaleString()} {request.currency}
          </div>
        </div>
        <div className="flex flex-col py-2 mt-24 justify-center items-center mb-12">
          {locale === "en" ? (
            <>
              <div className="font-bold">
                트래블 인 유어 포켓 [주/ 파리클래스]
              </div>
              <div>사업자 번호 #887-86-03126</div>
              <div>서울 특별시 중구 퇴계로 286, 6층 6063호</div>
            </>
          ) : (
            <>
              <div className="font-bold">
                Travel in your pocket [PARIS CLASS]
              </div>
              <div>Certified Number # 887-86-03126</div>
              <div>286, Toegye-ro, Jung-gu, Seoul, Republic of Korea </div>
            </>
          )}
        </div>
        <div className="flex justify-center items-center print:hidden mb-6">
          <button
            type="button"
            onClick={handlePrint}
            className="py-2 px-4 bg-egyptianBlue text-white"
          >
            {locale === "en" ? "Print" : "인쇄"}
          </button>
        </div>
      </div>
    </article>
  );
};

export default InvoicePrintPage;
