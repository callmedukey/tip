"use client";

import { PenLine } from "lucide-react";
import React, { useState } from "react";
import { Textarea } from "../ui/textarea";

const MyTravelListFinalRequestChangeBox = ({
  requestId,
}: {
  requestId: string;
}) => {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");

  return (
    <div className="lg:bg-[#FAFAFA]/95 bg-[#FAFAFA]  rounded-[2rem] flex flex-col items-center justify-center p-4 lg:mt-0 mt-8">
      <div className="lg:bg-white rounded-[1rem] py-4 px-2 w-full flex flex-col gap-4 items-center justify-center lg:block">
        <PenLine className="size-6" />
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border-none resize-none p-0 scrollbar-hide w-full shadow-none placeholder:text-center"
          placeholder="Please let us know if you cannot cancel your trip or have any emergency requests"
        />
      </div>
      <button className="mt-4 font-medium rounded-full px-4 py-1 border border-[#404040] text-[#404040] hover:bg-[#404040] hover:text-white transition-colors duration-300">
        Submit
      </button>
    </div>
  );
};

export default MyTravelListFinalRequestChangeBox;
