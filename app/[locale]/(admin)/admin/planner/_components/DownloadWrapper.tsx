"use client";
import MyTravelPDF from "@/components/user/MyTravelPDF";
import { Request } from "@prisma/client";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useTranslations } from "next-intl";
import React from "react";

const DownloadWrapper = ({ order }: { order: Request }) => {
  const t = useTranslations("adminPlanner");
  return (
    <PDFDownloadLink document={<MyTravelPDF request={order} />}>
      <span className="text-sm p-2 border border-black rounded-md block w-40 text-center font-bold bg-black text-white">
        {t("downloadAsPDF")}
      </span>
    </PDFDownloadLink>
  );
};

export default DownloadWrapper;
