"use client";
import { useState } from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Link, usePathname } from "@/i18n/routing";
import Menu from "@/public/icons/menu.svg";
import { cn } from "@/lib/utils";
import DarkLogo from "@/public/dark-logo.png";
import Image from "next/image";
import LanguageSelectDropDown from "../LanguageSelectDropDown";
import { useTranslations } from "next-intl";
import { DialogDescription, DialogTitle } from "../ui/dialog";
const links = [
  { href: "/my-profile", name: "myProfile" },
  { href: "/my-travel", name: "myTravel" },
  { href: "/partner-hotels", name: "partnerHotels" },
  { href: "/experience-by-tip", name: "experienceByTip" },
  { href: "/whats-new", name: "whatsNew" },
];

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("Header");
  return (
    <Drawer direction="left" open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="focus:outline-none" aria-label="모바일 메뉴">
        <Image src={Menu} alt="Menu" width={38} height={14} />
      </DrawerTrigger>
      <DrawerContent className="px-8 text-xl flex">
        <DialogTitle className="sr-only">Mobile Menu</DialogTitle>
        <DialogDescription className="sr-only">
          This is a mobile menu
        </DialogDescription>
        <div className="grid grid-cols-[1fr,auto,1fr] items-center">
          <LanguageSelectDropDown isMobile={true} />
          <Image
            src={DarkLogo}
            alt="Dark version logo"
            width={99}
            height={99}
          />
          <button
            className="text-[#A3A3A3] justify-self-end"
            type="button"
            onClick={() => {
              setOpen(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-10"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col justify-start items-start flex-1 gap-6 py-4">
          {links.map((nav) => (
            <Link
              href={nav.href}
              key={nav.href}
              className={cn(
                "w-full text-start",
                pathname === nav.href
                  ? "text-murrey underline underline-offset-4"
                  : ""
              )}
              prefetch={false}
              onClick={() => setOpen(false)}
            >
              {t(nav.name)}
            </Link>
          ))}
        </nav>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileMenu;
