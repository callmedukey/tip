"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";

const noReturnPaths = ["/", "/my-travel", "/my-travel/details"];

const HeaderBack = ({ className }: { className?: string }) => {
  const router = useRouter();
  const ui = useTranslations("ui");
  const path = usePathname();
  const handleReturnToFirstScreen = () => {
    if (window && window.history.length > 1) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  if (noReturnPaths.includes(path)) return null;

  return (
    <Button
      className={cn(
        "absolute lg:hidden top-[calc(var(--header-height))] left-0 z-20 bg-transparent text-white text-[0.75rem] shadow-none gap-2 flex items-center hover:bg-transparent hover:opacity-80",
        className
      )}
      type="button"
      onClick={handleReturnToFirstScreen}
    >
      <ArrowLeft strokeWidth={1} />
      {ui("back")}
    </Button>
  );
};

export default HeaderBack;
