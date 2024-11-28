import { Link } from "@/i18n/routing";
import { ArrowUp } from "lucide-react";
import React from "react";

const ScrollUpButton = () => {
  return (
    <Link
      href="/partner-hotels#country-dropdown"
      className="fixed bottom-4 left-4 bg-egyptianBlue text-white p-2 rounded-full z-50"
    >
      <ArrowUp className="size-6" />
    </Link>
  );
};

export default ScrollUpButton;
