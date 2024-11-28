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
}: {
  uniqueCountries: string[];
  partnerHotelsData: any;
  locale: string;
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
                      history.scrollRestoration = "manual";
                      window.scrollTo({
                        top: document.getElementById(
                          country.toLowerCase().replace(/\s+/g, "-")
                        )?.offsetTop,
                        behavior: "smooth",
                      });
                    }, 800);
                  }}
                >
                  {country}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </aside>
      {uniqueCountries
        .sort((a, b) =>
          a.localeCompare(b, locale === "ko" ? "ko" : "en", {
            sensitivity: "base",
          })
        )
        .map((country) => (
          <article
            key={country}
            id={country.toLowerCase().replace(/\s+/g, "-")}
            className="mt-16 lg:mt-32 max-w-screen-8xl mx-auto"
          >
            <h3 className="lg:text-[2rem] text-[1.5rem] font-semibold leading-normal text-left font-inter lg:mb-16 mb-4">
              {country}
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-x-4 gap-y-8 max-w-screen-8xl mx-auto text-[#404040] items-start">
              {partnerHotelsData.docs
                .filter((hotel: any) => hotel.country?.name === country)
                .map((hotel: any) => (
                  <HotelCard key={hotel.id} hotel={hotel} />
                ))}
            </ul>
          </article>
        ))}
      {isInView && <ScrollUpButton />}
    </div>
  );
};

export default HotelsContainer;
