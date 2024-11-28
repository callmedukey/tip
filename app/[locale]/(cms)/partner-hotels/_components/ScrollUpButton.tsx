"use client";
import { Link } from "@/i18n/routing";
import { ArrowUp } from "lucide-react";
import React from "react";
import { useTranslations } from "next-intl";

const ScrollUpButton = () => {
  const t = useTranslations("ui");
  return (
    <div className="w-fit  fixed bottom-4 left-4 z-50 flex flex-col items-center justify-center">
      <span className="text-sm text-egyptianBlue font-bold">
        {t("scrollUp")}
      </span>
      <Link
        href="/partner-hotels#country-dropdown"
        className="bg-egyptianBlue text-white p-2 rounded-full z-50"
      >
        <ArrowUp className="size-6" />
      </Link>
    </div>
  );
};

export default ScrollUpButton;
