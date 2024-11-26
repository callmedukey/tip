"use client";
import Image from "next/image";
import MyTravelPlane from "@/public/my-travel-plane.png";
import { Link } from "@/i18n/routing";
import type { Request } from "@prisma/client";
import {
  formatDateToLocaleString,
  formatDateToUserLocalFromDB,
} from "@/lib/time-formmater";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
import MyTravelListFinalRequestChangeBox from "./MyTravelListFinalRequestChangeBox";
import QuoteInvoiceModal from "../modals/QuoteInvoiceModal";
import MyTravelListItemShareButton from "./MyTravelListItemShareButton";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MyTravelPDF from "./MyTravelPDF";
import { useTranslations } from "next-intl";
import { type QueryKey, useQueryClient } from "@tanstack/react-query";
import { useState, useCallback } from "react";
import TravelCancelDialog from "./TravelCancelDialog";

const MyTravelListItem = ({
  request,
  isLoading = false,
  queryKey,
}: {
  request?: Request;
  isLoading?: boolean;
  queryKey?: QueryKey;
}) => {
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const t = useTranslations("myTravel");
  const t2 = useTranslations("MainFirstForm");

  const queryClient = useQueryClient();

  const handleCancel = async () => {
    if (!request?.id) return;

    setOpenCancelDialog(true);
  };

  const handleRevalidate = useCallback(() => {
    if (!queryKey) return;
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey });
    }, 3000);
  }, [queryClient, queryKey]);

  if (isLoading)
    return (
      <li className="grid lg:grid-rows-[6rem,auto,6rem] grid-rows-[repeat(3,auto)] py-4">
        <Image
          src={MyTravelPlane}
          width={712}
          height={656}
          quality={100}
          alt="My travel plane"
          className="max-w-[6rem] w-full h-auto flex-1 shrink-0 lg:hidden absolute left-1/2 -translate-x-1/2 -top-12 rounded-[2rem] bg-white"
        />
        <div className="flex lg:flex-row flex-col items-center text-center lg:text-left lg:justify-between lg:items-start lg:gap-0 gap-3 mb-6">
          <h2 className="text-formText lg:text-gray-500 text-base lg:text-[1.5rem] lg:font-medium">
            {t("myTravel")}
          </h2>
        </div>
        <div className="flex items-start lg:items-center gap-12 lg:flex-row flex-col mt-8 lg:mt-0">
          <Image
            src={MyTravelPlane}
            width={712}
            height={656}
            quality={100}
            alt="My travel plane"
            className="max-w-[178px] w-full h-auto flex-1 shrink-0 lg:block hidden"
          />
          <div className="flex flex-col gap-2 flex-1 lg:items-end w-full">
            <p className="text-formText text-base text-[1.5rem] font-medium">
              {t("destination")}
            </p>
            <Skeleton className="w-full  h-[2rem]" />
          </div>
          <div className="flex flex-col gap-2 flex-1 lg:items-end w-full">
            <p className="text-formText text-base text-[1.5rem] font-medium">
              {t("date")}
            </p>
            <Skeleton className="w-full h-[2rem]" />
          </div>
          <div className="flex flex-col gap-2 flex-1 lg:items-end w-full">
            <p className="text-formText text-base text-[1.5rem] font-medium">
              {t2("persons")}
            </p>
            <Skeleton className="w-full  h-[2rem]" />
          </div>
          <div className="flex flex-col gap-2 flex-1 lg:items-end w-full">
            <p className="text-formText text-base text-[1.5rem] font-medium">
              {t2("purpose")}
            </p>
            <Skeleton className="w-full h-[2rem]" />
          </div>
        </div>
      </li>
    );
  if (request)
    return (
      <li
        className={cn(
          "grid  py-4",
          request.paid
            ? "lg:grid-rows-[6rem,auto,6rem, 8rem] grid-rows-[repeat(4,auto)] xl:grid-cols-[auto,minmax(15rem,0.5fr)] gap-x-6 items-center"
            : ""
        )}
      >
        <Image
          src={MyTravelPlane}
          width={712}
          height={656}
          quality={100}
          alt="My travel plane"
          className="max-w-[6rem] w-full h-auto flex-1 shrink-0 lg:hidden absolute left-1/2 -translate-x-1/2 -top-12 rounded-[2rem] bg-white"
        />
        <div className="lg:grid-rows-[6rem,auto,6rem] grid-rows-[repeat(3,auto)]">
          <div className="flex lg:flex-row flex-col items-center text-center lg:text-left lg:justify-between lg:items-start lg:gap-0 gap-3">
            <h2 className="text-formText lg:text-gray-500 text-base lg:text-[1.5rem] lg:font-medium mb-6 flex flex-col gap-2 lg:flex-row">
              {t("myTravel")}
              {request.paid ||
              request.status === "confirmed" ||
              request.confirmed ? (
                <PDFDownloadLink document={<MyTravelPDF request={request} />}>
                  <span className="underline underline-offset-4 text-sm ml-4">
                    {t("downloadAsPDF")}
                  </span>
                </PDFDownloadLink>
              ) : null}
            </h2>

            {request.status !== "pending" ? (
              <Link
                href={`/my-travel/details?id=${request.id}`}
                className="flex items-center lg:gap-2 gap-3 lg:no-underline underline underline-offset-4 lg:text-gray-500 text-egyptianBlue lg:text-[1.5rem] font-medium"
              >
                {t("details")}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4 lg:size-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            ) : null}
          </div>
          <div className="flex items-start lg:items-center gap-4 lg:gap-4 lg:flex-row flex-col mt-8 lg:mt-0">
            <Image
              src={MyTravelPlane}
              width={712}
              height={656}
              quality={100}
              alt="My travel plane"
              className="max-w-[6rem] xl:max-w-[10rem] w-full h-auto flex-1 shrink-0 lg:block hidden"
            />
            <div className="flex flex-col gap-2 flex-1 ">
              <p className="text-formText text-base  text-[1.5rem] font-medium">
                {t("destination")}
              </p>
              <p className="text-base lg:text-base text-gray-500">
                {request.city.join(", ")}
              </p>
            </div>
            <div className="flex flex-col gap-2 flex-1 lg:items-end shrink-0">
              <p className="text-formText text-base text-[1.5rem] font-medium mr-auto">
                {t("date")}
              </p>
              <p className="text-base lg:text-base text-gray-500 mr-auto whitespace-nowrap">
                {formatDateToLocaleString(
                  formatDateToUserLocalFromDB(
                    request.from as unknown as string
                  ) as unknown as Date
                )}{" "}
                -{" "}
                {formatDateToLocaleString(
                  formatDateToUserLocalFromDB(
                    request.to as unknown as string
                  ) as unknown as Date
                )}
              </p>
            </div>
            <div className="flex flex-col gap-2 flex-1 lg:items-end">
              <p className="text-formText text-base text-[1.5rem] font-medium">
                {t2("persons")}
              </p>
              <p className="text-base lg:text-base text-gray-500 whitespace-nowrap">{`Adults: ${request.adults} Infants: ${request.infants}`}</p>
            </div>
            <div className="flex flex-col gap-2 flex-1 lg:items-end">
              <p className="text-formText text-base text-[1.5rem] font-medium">
                {t2("purpose")}
              </p>
              <p className="text-base lg:text-base text-gray-500 capitalize">
                {request.purpose}
              </p>
            </div>
          </div>
          <div className="items-center justify-end lg:gap-8 lg:flex-row lg:mt-0 mt-4 gap-6 hidden lg:flex">
            {request.travelPlan &&
              request.summary &&
              request.status !== "pending" && (
                <MyTravelListItemShareButton
                  requestId={request.id.toString()}
                  sharedLink={request.sharedLink}
                />
              )}

            {request.price &&
            request.price > 0 &&
            request.currency &&
            request.quoteLink ? (
              <QuoteInvoiceModal
                requestId={request.id.toString()}
                price={request.price}
                currency={request.currency}
                paid={request.paid}
                invoiceUrl={request.quoteLink}
              >
                <button className="bg-egyptianBlue text-white max-w-xs w-full lg:w-[15rem] py-4 rounded-full font-medium">
                  {t("seeQuote")}
                </button>
              </QuoteInvoiceModal>
            ) : null}
            <button
              className="bg-transparent text-cancel border border-cancel max-w-xs w-full lg:w-[15rem] py-4 rounded-full font-medium"
              type="button"
              onClick={handleCancel}
            >
              {t("cancel")}
            </button>
          </div>
        </div>

        {request.paid && (
          <>
            <MyTravelListFinalRequestChangeBox requestId={request.id} />
            <div className="flex items-center justify-end lg:gap-8 lg:flex-row flex-col lg:mt-0 mt-16 gap-6 lg:hidden">
              <MyTravelListItemShareButton
                requestId={request.id.toString()}
                sharedLink={request.sharedLink}
              />
              {request.price &&
              request.price > 0 &&
              request.currency &&
              request.quoteLink ? (
                <QuoteInvoiceModal
                  requestId={request.id.toString()}
                  price={request.price}
                  currency={request.currency}
                  paid={request.paid}
                  invoiceUrl={request.quoteLink}
                >
                  <button className="bg-egyptianBlue text-white max-w-xs w-full lg:w-[15rem] py-4 rounded-full font-medium">
                    {t("seeQuote")}
                  </button>
                </QuoteInvoiceModal>
              ) : null}
              <button
                className="bg-transparent text-cancel border border-cancel max-w-xs w-full lg:w-[15rem] py-4 rounded-full font-medium"
                type="button"
                onClick={handleCancel}
              >
                {t("cancel")}
              </button>
            </div>
          </>
        )}
        {!request.paid && (
          <>
            <div className="flex items-center justify-end lg:gap-8 lg:flex-row flex-col lg:mt-0 mt-16 gap-6 lg:hidden">
              <MyTravelListItemShareButton
                requestId={request.id.toString()}
                sharedLink={request.sharedLink}
              />
              {request.price &&
              request.price > 0 &&
              request.currency &&
              request.quoteLink ? (
                <QuoteInvoiceModal
                  price={request.price}
                  currency={request.currency}
                  paid={request.paid}
                  requestId={request.id.toString()}
                  invoiceUrl={request.quoteLink}
                >
                  <button className="bg-egyptianBlue text-white max-w-xs w-full lg:w-[15rem] py-4 rounded-full font-medium">
                    {t("seeQuote")}
                  </button>
                </QuoteInvoiceModal>
              ) : null}

              <button
                className="bg-transparent text-cancel border border-cancel max-w-xs w-full lg:w-[15rem] py-4 rounded-full font-medium"
                type="button"
                onClick={handleCancel}
              >
                {t("cancel")}
              </button>
              <TravelCancelDialog
                open={openCancelDialog}
                setOpen={setOpenCancelDialog}
                request={request}
                handleRevalidate={handleRevalidate}
              />
            </div>
          </>
        )}
      </li>
    );

  return (
    <li className="grid lg:grid-rows-[6rem,auto,6rem] grid-rows-[repeat(3,auto)] py-4">
      <Image
        src={MyTravelPlane}
        width={712}
        height={656}
        quality={100}
        alt="My travel plane"
        className="max-w-[6rem] w-full h-auto flex-1 shrink-0 lg:hidden absolute left-1/2 -translate-x-1/2 -top-12 rounded-[2rem] bg-white"
      />
      <div className="flex lg:flex-row flex-col items-center text-center lg:text-left lg:justify-between lg:items-start lg:gap-0 gap-3">
        <h2 className="text-formText lg:text-gray-500 text-base lg:text-[1.5rem] lg:font-medium mb-6">
          {t("myTravel")}
        </h2>
      </div>
      <div className="flex items-start lg:items-center gap-12 lg:flex-row flex-col mt-24 lg:mt-0">
        <Image
          src={MyTravelPlane}
          width={712}
          height={656}
          quality={100}
          alt="My travel plane"
          className="max-w-[178px] w-full h-auto flex-1 shrink-0 lg:block hidden"
        />
        <div className="w-full text-gray-500">
          {t("noActiveTravelRequests")}
        </div>
      </div>
      <div className="flex items-center justify-end lg:gap-8 lg:flex-row flex-col lg:mt-0 mt-16 gap-6">
        <Link
          href="/"
          className="bg-egyptianBlue text-white max-w-xs w-full lg:w-[15rem] py-4 rounded-full font-medium flex items-center justify-center"
        >
          {t("bookNow")}
        </Link>
      </div>
    </li>
  );
};

export default MyTravelListItem;
