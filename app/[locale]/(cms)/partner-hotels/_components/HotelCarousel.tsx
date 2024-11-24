"use client";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "@splidejs/react-splide/css/core";
import { PartnerHotelCarousel } from "../page";
import Image from "next/image";
import { getImageUrl } from "@/lib/cms";
import { Link } from "@/i18n/routing";
import { ArrowRightIcon } from "lucide-react";

const HotelCarousel = ({
  hotelCarousel,
  locale,
}: {
  hotelCarousel: PartnerHotelCarousel[];
  locale: string;
}) => {
  const splideOptions1 = {
    type: "loop", // Loop back to the beginning when reaching the end
    perPage: 1, // Number of items visible per page
    perMove: 1, // Move one item at a time
    pagination: false, // Enable pagination dots
    autoplay: true,
    interval: 5000,
    speed: 3800,
    arrows: false,
    easing: "ease",
  };

  return (
    <ul className="mt-32 px-4">
      <Splide options={splideOptions1}>
        {hotelCarousel.map((data, i) => (
          <SplideSlide key={i}>
            <div key={data.id} className="flex flex-col items-center">
              <div className="w-full h-full lg:grid lg:grid-cols-3 gap-16 sm:px-24 lg:items-center flex justify-center px-2">
                <Image
                  src={getImageUrl(data.leftThumbnail.url)}
                  alt={
                    locale === "en"
                      ? data.leftThumbnail.en_alt
                      : data.leftThumbnail.kr_alt
                  }
                  width={data.leftThumbnail.width}
                  height={data.leftThumbnail.height}
                  quality={100}
                  className=" hidden lg:block mx-auto w-full object-fill h-[20rem]"
                />
                <Image
                  src={getImageUrl(data.centerThumbnail.url)}
                  alt={
                    locale === "en"
                      ? data.centerThumbnail.en_alt
                      : data.centerThumbnail.kr_alt
                  }
                  width={data.centerThumbnail.width}
                  height={data.centerThumbnail.height}
                  quality={100}
                  className=" mx-auto w-full object-cover object-center lg:object-fill lg:h-[20rem] min-w-full h-[15rem]"
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
                  quality={100}
                  className=" hidden lg:block mx-auto w-full object-fill h-[20rem]"
                />
              </div>
              <div className="flex flex-col gap-4 items-center mt-12 col-span-full">
                <span>{locale === "en" ? data.en_title : data.kr_title}</span>
                <span className="max-w-[22rem] text-center mx-auto max-h-[10rem] overflow-hidden">
                  {locale === "en" ? data.en_subText : data.kr_subText}
                </span>
                <Link
                  href={data.link}
                  className="text-[0.75rem] text-[#404040] border border-[#404040] font-normal py-2 px-4 rounded-full w-28 flex items-center justify-between"
                >
                  {locale === "en" ? "See more" : "더 보기"}
                  <ArrowRightIcon className="w-4 h-4" strokeWidth={1} />
                </Link>
              </div>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </ul>
  );
};

export default HotelCarousel;
