"use client";

import { PenLine } from "lucide-react";
import React, { useState } from "react";
import { Textarea } from "../ui/textarea";
import { submitEmergencyRequest } from "@/actions/user";
import { useTranslations } from "next-intl";

const MyTravelListFinalRequestChangeBox = ({
  requestId,
}: {
  requestId: number;
}) => {
  const t = useTranslations("MyTravelListFinalRequestChangeBox");
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    const response = await submitEmergencyRequest(requestId, text);

    if (response.message) {
      alert(response.message);
    }

    setText("");
    setLoading(false);
  };

  return (
    <div className="lg:bg-[#FAFAFA]/95 bg-[#FAFAFA] rounded-[2rem] flex flex-col items-center justify-center p-4 lg:mt-0 mt-8">
      <div className="lg:bg-white rounded-[1rem] py-4 px-2 w-full flex flex-col gap-4 items-center justify-center lg:block">
        <PenLine className="size-6" />
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border-none resize-none p-0 scrollbar-hide w-full shadow-none placeholder:text-center"
          placeholder={t("placeholder")}
        />
      </div>
      <button
        type="button"
        disabled={loading}
        onClick={handleSubmit}
        className="mt-4 font-medium rounded-full px-4 py-1 border border-[#404040] text-[#404040] hover:bg-[#404040] hover:text-white transition-colors duration-300"
      >
        {loading ? t("submitting") : t("submit")}
      </button>
    </div>
  );
};

export default MyTravelListFinalRequestChangeBox;
