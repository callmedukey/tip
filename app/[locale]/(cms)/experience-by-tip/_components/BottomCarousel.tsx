"use client";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "@splidejs/react-splide/css/core";
import Image from "next/image";
import { getImageUrl } from "@/lib/cms";
import { Link } from "@/i18n/routing";
import { ArrowRightIcon } from "lucide-react";
import type { ExperienceBottomCarousel } from "../page";

const BottomCarousel = ({
  bottomCarousel,
  locale,
}: {
  bottomCarousel: ExperienceBottomCarousel[];
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
    direction: "rtl",
  };

  return (
    <ul className="py-24 max-w-screen-8xl mx-auto w-full px-4 lg:px-12">
      <Splide options={splideOptions1}>
        {bottomCarousel.map((data, i) => (
          <SplideSlide key={i}>
            <div
              key={data.id}
              className="flex gap-6 lg:gap-24 items-center lg:flex-row-reverse flex-col lg:h-[30rem] text-left"
            >
              <div className="w-full max-w-sm ml-0 mr-auto lg:mx-auto order-2 lg:order-1">
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
                  className="mt-8 text-murrey border w-fit border-murrey py-2 px-4 flex items-center gap-4 ml-0 mr-auto"
                >
                  더보기 <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
              <div className="flex-1 flex gap-2 self-stretch flex-col sm:flex-row order-2 lg:order-1">
                <Image
                  src={getImageUrl(data.leftThumbnail.url)}
                  alt={
                    locale === "en"
                      ? data.leftThumbnail.en_alt
                      : data.leftThumbnail.kr_alt
                  }
                  width={data.leftThumbnail.width}
                  height={data.leftThumbnail.height}
                  className="object-cover object-center lg:self-start w-full lg:max-w-[25rem] lg:max-h-[80%] lg:w-fit max-h-[15rem] rounded-[2rem]"
                />
                <Image
                  src={getImageUrl(data.rightThumbnail.url)}
                  alt={
                    locale === "en"
                      ? data.rightThumbnail.en_alt
                      : data.rightThumbnail.kr_alt
                  }
                  width={data.rightThumbnail.width}
                  height={data.rightThumbnail.height}
                  className="object-cover object-center lg:self-end w-full lg:max-w-[25rem] lg:max-h-[80%] lg:w-fit max-h-[15rem] rounded-[2rem]"
                />
              </div>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </ul>
  );
};

export default BottomCarousel;
