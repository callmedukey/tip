"use client";
import { Locale, usePathname, useRouter } from "@/i18n/routing";
import Globe from "@/public/globe.svg";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const LanguageSelectDropDown = ({ isMobile }: { isMobile?: boolean }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Header");
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (locale: Locale) => {
    startTransition(() => {
      router.push(pathname, { locale });
    });
  };
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className={cn(!isMobile && "hidden lg:block")}>
        {isMobile ? (
          <div className="text-xl font-normal text-left flex items-center gap-2">
            {locale === "en" ? "EN" : "KR"}
            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        ) : (
          <Image src={Globe} alt="Globe" width={36} height={36} />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="text-center">
        {!isMobile && (
          <>
            <DropdownMenuLabel>{t("Languages")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuItem asChild>
          <button
            type="button"
            className={cn(
              "text-center w-full flex justify-center items-center",
              isMobile && "text-left"
            )}
            onClick={() => handleLanguageChange("en")}
          >
            {isMobile ? "EN" : "English"}
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <button
            type="button"
            className={cn(
              "text-center w-full flex justify-center items-center",
              isMobile && "text-left "
            )}
            onClick={() => handleLanguageChange("ko")}
          >
            {isMobile ? "KR" : "한국어"}
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelectDropDown;
