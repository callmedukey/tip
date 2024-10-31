"use client";

import { Link } from "@/i18n/routing";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Request } from "@prisma/client";
import { Skeleton } from "../ui/skeleton";
import {
  formatDateToUserLocalFromDB,
  formatDateToLocaleString,
} from "@/lib/time-formmater";
import { useQuery } from "@tanstack/react-query";
import QuoteInvoiceModal from "../modals/QuoteInvoiceModal";
import { useTranslations } from "next-intl";

const MyTravelHistoryItems = () => {
  const t = useTranslations("MyTravelHistoryItems");
  const { data, isLoading } = useQuery<Request[]>({
    queryKey: ["my-travel", "history"],
    queryFn: async () => {
      const res = await fetch(`/api/user/my-travel/history`);
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="max-h-[30rem] overflow-y-scroll space-y-2">
        <Skeleton className="w-full h-[3rem]" />
        <Skeleton className="w-full h-[3rem]" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-h-[30rem] overflow-y-scroll text-center">Error</div>
    );
  }

  if (data && data.length === 0) {
    return (
      <div className="max-h-[30rem] overflow-y-scroll text-center">
        {t("noHistory")}
      </div>
    );
  }

  return (
    <div className="max-h-[50rem] overflow-y-auto">
      <Accordion type="single" collapsible>
        {data.map((history) => (
          <AccordionItem value={history.id.toString()} key={history.id}>
            <AccordionTrigger isHistory={true} className="">
              <div className="flex flex-col">
                <p className="text-base text-formText text-left">{t("date")}</p>
                <p className="text-accountGrayText">
                  {formatDateToLocaleString(
                    formatDateToUserLocalFromDB(
                      history.from as unknown as string
                    ) as unknown as Date
                  )}{" "}
                  -{" "}
                  {formatDateToLocaleString(
                    formatDateToUserLocalFromDB(
                      history.to as unknown as string
                    ) as unknown as Date
                  )}
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent className="flex items-start lg:items-center gap-2 lg:flex-row flex-col text-accountGrayText">
              <div className="flex flex-col gap-2 flex-1 lg:items-end w-full">
                <p className="text-formText text-base lg:text-[1.25rem] font-medium">
                  {t("destination")}
                </p>
                {history.city}
              </div>
              <div className="flex flex-col gap-2 flex-1 lg:items-end w-full">
                <p className="text-formText text-base lg:text-[1.25rem] font-medium">
                  {t("persons")}
                </p>
                {`Adults: ${history.adults} Infants: ${history.infants}`}
              </div>
              <div className="flex flex-col gap-2 flex-1 lg:items-end w-full">
                <p className="text-formText text-base lg:text-[1.25rem] font-medium ">
                  {t("purpose")}
                </p>
                <span className="capitalize">{history.purpose}</span>
              </div>
              {history.price && history.currency && (
                <div className="flex flex-col gap-2 flex-1 lg:items-end w-full">
                  <p className="text-formText text-base lg:text-[1.25rem] font-medium ">
                    {t("invoice")}
                  </p>
                  <QuoteInvoiceModal
                    price={history.price}
                    currency={history.currency}
                    paid={history.paid}
                    invoiceUrl={history.quoteLink ?? undefined}
                  >
                    <span className="capitalize underline cursor-pointer">
                      {t("seeMyInvoice")}
                    </span>
                  </QuoteInvoiceModal>
                </div>
              )}

              {history.status !== "pending" && (
                <div className="self-end flex-1 text-right flex justify-end">
                  <Link
                    href={`/my-travel/details?id=${history.id}`}
                    className="text-right mr-0 ml-auto flex items-center gap-2 lg:text-base text-[0.75rem] text-egyptianBlue"
                  >
                    <span className="underline">{t("details")}</span>
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
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default MyTravelHistoryItems;
