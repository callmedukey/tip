"use client";

import { PenLine } from "lucide-react";
import React, { useState } from "react";
import { Textarea } from "../ui/textarea";
import { createEditRequest } from "@/actions/user";
import { useTranslations } from "next-intl";

const TravelDetailsEditInput = ({ requestId }: { requestId: number }) => {
  const t = useTranslations("MyTravelDetails");
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");

  const handleSubmit = async () => {
    if (loading || !text.trim()) return;
    setLoading(true);

    if (!confirm(t("changeConfirm"))) {
      setLoading(false);
      return;
    }
    if (!text.trim()) return;
    const res = await createEditRequest({ requestId, content: text.trim() });

    if (res.message) {
      alert(res.message);
    } else {
      alert(t("created"));
      window.location.reload();
    }
    setLoading(false);
  };

  return (
    <div className="lg:bg-[#FAFAFA]/95 bg-[#FAFAFA]  rounded-[2rem] flex flex-col items-center justify-center p-4 lg:mt-0 mt-8 w-full ">
      <div className="lg:bg-white rounded-[1rem] py-4 px-2 w-full flex flex-col gap-4 items-center justify-center lg:block">
        <PenLine className="size-6 mx-auto" />
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border-none resize-none p-0 scrollbar-hide w-full shadow-none placeholder:text-center placeholder:translate-y-6"
          placeholder={t("changes")}
        />
      </div>
      <button
        type="button"
        onClick={handleSubmit}
        className="mt-4 font-medium rounded-full px-4 py-1 border border-[#404040] text-[#404040] hover:bg-[#404040] hover:text-white transition-colors duration-300"
      >
        {t("submit")}
      </button>
    </div>
  );
};

export default TravelDetailsEditInput;
