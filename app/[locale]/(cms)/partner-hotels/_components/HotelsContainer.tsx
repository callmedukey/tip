"use client";

import { useRef } from "react";
import HotelCard from "./HotelCard";
import ScrollUpButton from "./ScrollUpButton";
import { useInView } from "framer-motion";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "@/i18n/routing";
import { useState } from "react";
const HotelsContainer = ({
  uniqueCountries,
  partnerHotelsData,
  locale,
  children,
}: {
  uniqueCountries: string[];
  partnerHotelsData: any;
  locale: string;
  children: React.ReactNode;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <div ref={ref} className="relative">
      <aside className="flex justify-end px-4 mt-16" id="country-dropdown">
        <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
          <DropdownMenuTrigger className="bg-transparent text-egyptianBlue border border-egyptianBlue max-w-xs w-full lg:w-[15rem] gap-4 py-4 rounded-full font-medium flex items-center justify-center">
            <span>{locale === "en" ? "Country" : "국가"}</span>
            <ChevronDownIcon className="w-4 h-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="center"
            className="min-w-full lg:w-[15rem] border-egyptianBlue max-h-[10rem] overflow-y-auto"
          >
            {uniqueCountries.map((country) => (
              <DropdownMenuItem key={country} asChild>
                <Link
                  href={`#${country.toLowerCase().replace(/\s+/g, "-")}`}
                  className="w-full cursor-pointer py-2 text-egyptianBlue"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenDropdown(false);
                    setTimeout(() => {
                      const element = document.getElementById(
                        country.toLowerCase().replace(/\s+/g, "-")
                      );
                      if (element) {
                        const elementPosition =
                          element.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.scrollY;

                        window.scrollTo({
                          top: offsetPosition,
                          behavior: "smooth",
                        });
                      }
                    }, 500); // Reduced timeout to make scrolling feel more responsive
                  }}
                >
                  {country}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </aside>
      {children}
      {isInView && <ScrollUpButton />}
    </div>
  );
};

export default HotelsContainer;
