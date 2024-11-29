"use client";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "@splidejs/react-splide/css/core";
import Image from "next/image";
import { getImageUrl } from "@/lib/cms";
import { Link } from "@/i18n/routing";
import { ArrowRightIcon } from "lucide-react";
import type { ExperienceTopCarousel } from "../page";

const TopCarousel = ({
  topCarousel,
  locale,
}: {
  topCarousel: ExperienceTopCarousel[];
  locale: string;
}) => {
  const splideOptions1 = {
    type: "loop", // Loop back to the beginning when reaching the end
    perPage: 1, // Number of items visible per page
    perMove: 1, // Move one item at a time
    pagination: false, // Enable pagination dots
    autoplay: true,
    interval: 8000,
    speed: 5800,
    arrows: false,
    easing: "ease",
    gap: "16px",
  };

  return (
    <ul className="pt-24 pb-12 max-w-screen-8xl mx-auto w-full px-4 lg:px-12">
      <Splide options={splideOptions1}>
        {topCarousel.map((data, i) => (
          <SplideSlide key={i}>
            <div
              key={data.id}
              className="flex gap-6 lg:gap-24 items-center lg:flex-row flex-col lg:h-[25rem]"
            >
              <Image
                src={getImageUrl(data.thumbnail.url)}
                alt={
                  locale === "en"
                    ? data.thumbnail.en_alt
                    : data.thumbnail.kr_alt
                }
                width={data.thumbnail.width}
                height={data.thumbnail.height}
                className="object-cover object-center rounded-[2rem] aspect-square max-h-full lg:max-w-[450px]"
              />
              <div className="flex-1">
                <span className="uppercase block text-[0.625rem] font-normal text-egyptianBlue">
                  Featured Experience
                </span>
                <p className="text-[2rem] mt-4 font-medium text-[#404040] leading-normal">
                  {locale === "en" ? data.en_title : data.kr_title}
                </p>
                <p className="text-base font-normal mt-8 text-[#404040]">
                  {locale === "en" ? data.en_subText : data.kr_subText}
                </p>
                <Link
                  href={data.link}
                  className="mt-8 text-murrey border w-fit border-murrey py-2 px-4 flex items-center gap-4"
                >
                  더보기 <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </ul>
  );
};

export default TopCarousel;
