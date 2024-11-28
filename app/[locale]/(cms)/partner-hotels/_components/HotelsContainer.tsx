"use client";

import { useRef } from "react";
import HotelCard from "./HotelCard";
import ScrollUpButton from "./ScrollUpButton";
import { useInView } from "framer-motion";

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

  return (
    <div ref={ref} className="relative">
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
            className="mt-16 lg:mt-32 max-w-screen-8xl mx-auto scroll-mt-32"
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
