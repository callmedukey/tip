"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";

const QuoteInvoiceModal = ({
  children,
  price,
  currency,
  paid,
  requestId,
  invoiceUrl,
}: {
  children: React.ReactNode;
  price: number;
  currency: string;
  paid: boolean;
  requestId?: string;
  invoiceUrl?: string;
}) => {
  const locale = useLocale();
  const t = useTranslations("QuoteInvoiceModal");
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-screen-8xl w-[95%] min-h-20rem rounded-[2rem] lg:rounded-[3rem] py-8 lg:min-h-[calc(100vh-30rem)] items-center justify-center">
        <DialogHeader className="sr-only">
          <DialogTitle>{t("viewInvoice")}</DialogTitle>
          <DialogDescription>{t("viewInvoiceDescription")}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 lg:gap-16">
          <div className="font-bold text-center sm:text-[2rem] lg:text-[2.5rem]">
            {t("totalAmount")}
          </div>
          <div className="text-center font-semibold sm:text-[2rem] lg:text-[2.5rem]">
            {price.toLocaleString()} {currency}
          </div>
          <p className="text-center">{t("weWishYou")}</p>
          <div className="flex gap-4 justify-center items-center lg:flex-row flex-col">
            {price > 0 && currency && requestId ? (
              <Link
                href={`/my-travel/invoice?requestId=${requestId}`}
                type="button"
                className="text-center py-2 px-12 rounded-full border text-egyptianBlue border-egyptianBlue"
              >
                {t("viewInvoice")}
              </Link>
            ) : null}

            {paid ? (
              <>
                <div className="text-center py-2 px-12 rounded-full bg-egyptianBlue text-white">
                  {t("paymentCompleted")}
                </div>
              </>
            ) : (
              <a
                href={invoiceUrl}
                target="_blank"
                className="text-center block py-4 px-6 rounded-full bg-egyptianBlue text-white max-w-sm mx-auto w-full"
              >
                Payment Link
              </a>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteInvoiceModal;
