import React from "react";
import Image from "next/image";
import BackgroundImage from "@/public/experiences-banner.png";
import { getLocale } from "next-intl/server";
import type { CMSCall, PartnerHotelThumbnail } from "../partner-hotels/page";
import TopCarousel from "./_components/TopCarousel";
import BottomCarousel from "./_components/BottomCarousel";
import ExperienceCard from "./_components/ExperienceCard";
import { cn } from "@/lib/utils";
export const dynamic = "force-dynamic";

// const fakeTopData: ExperienceTopCarousel[] = [
//   {
//     id: "1",
//     en_title: "모엣 샹동 & 돔페리뇽 샹파뉴 샴페인 프라이빗 투어",
//     kr_title: "모엣 샹동 & 돔페리뇽 샹파뉴 샴페인 프라이빗 투어",
//     en_subText: "파리를 사랑한다면, 와인과 샴페인을 사랑한다면.",
//     kr_subText: "파리를 사랑한다면, 와인과 샴페인을 사랑한다면.",
//     thumbnail: {
//       createdAt: "",
//       en_alt: "",
//       kr_alt: "",
//       id: 0,
//       updatedAt: "",
//       url: "/test.png",
//       filename: "",
//       mimeType: "",
//       filesize: 0,
//       width: 200,
//       height: 450,
//       focalX: 0,
//       focalY: 0,
//     },
//     link: "",
//     order: 0,
//   },
//   {
//     id: "2",
//     en_title: "모엣 샹동 & 돔페리뇽 샹파뉴 샴페인 프라이빗 투어2",
//     kr_title: "모엣 샹동 & 돔페리뇽 샹파뉴 샴페인 프라이빗 투어2",
//     en_subText: "파리를 사랑한다면, 와인과 샴페인을 사랑한다면.",
//     kr_subText: "파리를 사랑한다면, 와인과 샴페인을 사랑한다면.",
//     thumbnail: {
//       createdAt: "",
//       en_alt: "",
//       kr_alt: "",
//       id: 0,
//       updatedAt: "",
//       url: "/test.png",
//       filename: "",
//       mimeType: "",
//       filesize: 0,
//       width: 200,
//       height: 450,
//       focalX: 0,
//       focalY: 0,
//     },
//     link: "",
//     order: 0,
//   },
// ];
// const fakeBottomData: ExperienceBottomCarousel[] = [
//   {
//     id: "1",
//     en_title: "모엣 샹동 & 돔페리뇽 샹파뉴 샴페인 프라이빗 투어",
//     kr_title: "모엣 샹동 & 돔페리뇽 샹파뉴 샴페인 프라이빗 투어",
//     en_subText: "파리를 사랑한다면, 와인과 샴페인을 사랑한다면.",
//     kr_subText: "파리를 사랑한다면, 와인과 샴페인을 사랑한다면.",
//     leftThumbnail: {
//       createdAt: "",
//       en_alt: "",
//       kr_alt: "",
//       id: 0,
//       updatedAt: "",
//       url: "/test-1.png",
//       filename: "",
//       mimeType: "",
//       filesize: 0,
//       width: 200,
//       height: 450,
//       focalX: 0,
//       focalY: 0,
//     },
//     rightThumbnail: {
//       createdAt: "",
//       en_alt: "",
//       kr_alt: "",
//       id: 0,
//       updatedAt: "",
//       url: "/test-2.png",
//       filename: "",
//       mimeType: "",
//       filesize: 0,
//       width: 200,
//       height: 450,
//       focalX: 0,
//       focalY: 0,
//     },
//     link: "",
//     order: 0,
//   },
//   {
//     id: "2",
//     en_title: "모엣 샹동 & 돔페리뇽 샹파뉴 샴페인 프라이빗 투어2",
//     kr_title: "모엣 샹동 & 돔페리뇽 샹파뉴 샴페인 프라이빗 투어2",
//     en_subText: "파리를 사랑한다면, 와인과 샴페인을 사랑한다면.",
//     kr_subText: "파리를 사랑한다면, 와인과 샴페인을 사랑한다면.",
//     leftThumbnail: {
//       createdAt: "",
//       en_alt: "",
//       kr_alt: "",
//       id: 0,
//       updatedAt: "",
//       url: "/test-1.png",
//       filename: "",
//       mimeType: "",
//       filesize: 0,
//       width: 200,
//       height: 450,
//       focalX: 0,
//       focalY: 0,
//     },
//     rightThumbnail: {
//       createdAt: "",
//       en_alt: "",
//       kr_alt: "",
//       id: 0,
//       updatedAt: "",
//       url: "/test-2.png",
//       filename: "",
//       mimeType: "",
//       filesize: 0,
//       width: 200,
//       height: 450,
//       focalX: 0,
//       focalY: 0,
//     },
//     link: "",
//     order: 0,
//   },
// ];

// const fakeExperienceData: ExperienceData[] = [
//   {
//     id: "1",
//     en_title: "모엣 샹동 & 돔페리뇽 샹파뉴 샴페인 프라이빗 투어",
//     en_content: "content",
//     kr_title: "모엣 샹동 & 돔페리뇽 샹파뉴 샴페인 프라이빗 투어",
//     kr_content: "content",
//     thumbnail: {
//       createdAt: "",
//       en_alt: "",
//       kr_alt: "",
//       id: 0,
//       updatedAt: "",
//       url: "/dummy/dummy-test-1.png",
//       filename: "",
//       mimeType: "",
//       filesize: 0,
//       width: 200,
//       height: 450,
//       focalX: 0,
//       focalY: 0,
//     },
//     slug: "",
//     en_keywords: "",
//     kr_keywords: "",
//     order: 0,
//   },
//   {
//     id: "1",
//     en_title: "모엣 샹동 & 돔페리뇽 샹파뉴 샴페인 프라이빗 투어2",
//     en_content: "content",
//     kr_title: "모엣 샹동 & 돔페리뇽 샹파뉴 샴페인 프라이빗 투어2",
//     kr_content: "content",
//     thumbnail: {
//       createdAt: "",
//       en_alt: "",
//       kr_alt: "",
//       id: 0,
//       updatedAt: "",
//       url: "/dummy/dummy-test-2.png",
//       filename: "",
//       mimeType: "",
//       filesize: 0,
//       width: 200,
//       height: 450,
//       focalX: 0,
//       focalY: 0,
//     },
//     slug: "",
//     en_keywords: "",
//     kr_keywords: "",
//     order: 0,
//   },
//   {
//     id: "1",
//     en_title: "모엣 샹동 & 돔페리뇽 샹파뉴 샴페인 프라이빗 투어",
//     en_content: "content",
//     kr_title: "모엣 샹동 & 돔페리뇽 샹파뉴 샴페인 프라이빗 투어",
//     kr_content: "content",
//     thumbnail: {
//       createdAt: "",
//       en_alt: "",
//       kr_alt: "",
//       id: 0,
//       updatedAt: "",
//       url: "/dummy/dummy-test-3.png",
//       filename: "",
//       mimeType: "",
//       filesize: 0,
//       width: 200,
//       height: 450,
//       focalX: 0,
//       focalY: 0,
//     },
//     slug: "",
//     en_keywords: "",
//     kr_keywords: "",
//     order: 0,
//   },
//   {
//     id: "1",
//     en_title: "모엣 샹동 & 돔페리뇽 샹파뉴 샴페인 프라이빗 투어",
//     en_content: "content",
//     kr_title: "모엣 샹동 & 돔페리뇽 샹파뉴 샴페인 프라이빗 투어",
//     kr_content: "content",
//     thumbnail: {
//       createdAt: "",
//       en_alt: "",
//       kr_alt: "",
//       id: 0,
//       updatedAt: "",
//       url: "/dummy/dummy-test-4.png",
//       filename: "",
//       mimeType: "",
//       filesize: 0,
//       width: 200,
//       height: 450,
//       focalX: 0,
//       focalY: 0,
//     },
//     slug: "",
//     en_keywords: "",
//     kr_keywords: "",
//     order: 0,
//   },
//   {
//     id: "1",
//     en_title: "모엣 샹동 & 돔페리뇽 샹파뉴 샴페인 프라이빗 투어",
//     en_content: "content",
//     kr_title: "모엣 샹동 & 돔페리뇽 샹파뉴 샴페인 프라이빗 투어",
//     kr_content: "content",
//     thumbnail: {
//       createdAt: "",
//       en_alt: "",
//       kr_alt: "",
//       id: 0,
//       updatedAt: "",
//       url: "/dummy/dummy-test-5.png",
//       filename: "",
//       mimeType: "",
//       filesize: 0,
//       width: 200,
//       height: 450,
//       focalX: 0,
//       focalY: 0,
//     },
//     slug: "",
//     en_keywords: "",
//     kr_keywords: "",
//     order: 0,
//   },
// ];

export type ExperienceTopCarousel = {
  en_title: string;
  kr_title: string;
  en_subText: string;
  kr_subText: string;
  thumbnail: PartnerHotelThumbnail;
  link: string;
  order: number;
  id: string;
};
export type ExperienceBottomCarousel = {
  en_title: string;
  kr_title: string;
  en_subText: string;
  kr_subText: string;
  leftThumbnail: PartnerHotelThumbnail;
  rightThumbnail: PartnerHotelThumbnail;
  link: string;
  order: number;
  id: string;
};

export type ExperienceData = {
  en_title: string;
  en_content: any[];
  kr_title: string;
  kr_content: any[];
  thumbnail: PartnerHotelThumbnail;
  slug: string;
  en_keywords: string;
  kr_keywords: string;
  country: {
    id: number;
    name: string;
  }[];
  order: number;
  id: string;
};

export type ExperienceTopCarouselData = CMSCall<ExperienceTopCarousel>;

const page = async () => {
  const locale = await getLocale();

  const [experiences, experiencesTopCarousel, experiencesBottomCarousel] =
    await Promise.all([
      fetch(
        `http://localhost:4000/api/experiences?locale=null&draft=false&depth=1&limit=200`,
        {
          cache: "no-store",
        }
      ),
      fetch(
        `http://localhost:4000/api/experiences-top-carousel?locale=null&draft=false&depth=1&limit=200`,
        {
          cache: "no-store",
        }
      ),
      fetch(
        `http://localhost:4000/api/experiences-bottom-carousel?locale=null&draft=false&depth=1&limit=200`,
        {
          cache: "no-store",
        }
      ),
    ]);
  const experiencesData: CMSCall<ExperienceData> = await experiences.json();
  const experiencesTopCarouselData: CMSCall<ExperienceTopCarousel> =
    await experiencesTopCarousel.json();
  const experiencesBottomCarouselData: CMSCall<ExperienceBottomCarousel> =
    await experiencesBottomCarousel.json();

  const uniqueCountries = Array.from(
    new Set(
      experiencesData.docs
        .map((experience) => experience.country)
        .flatMap((country) => country)
        .map((country) => country.name)
    )
  );

  return (
    <main className="pb-[4rem] lg:pb-[8rem]">
      <section className="relative w-full min-h-[min(80vh,120rem)] isolate mt-[-5rem] pt-[8rem]">
        <Image
          src={BackgroundImage}
          alt="Another Cloud Background"
          fill
          quality={100}
          priority
          placeholder="blur"
          className="object-cover object-center -z-10"
        />
        <h1 className="text-center mx-auto text-white text-[1.25rem] lg:text-[2.5rem] font-normal mt-32 title-indicator font-garamond tracking-normal leading-loose">
          We offer unique experiences tailored just for you,{" "}
          <br className="hidden sm:block" />
          <span className="italic">beyond the ordinary journey.</span>
        </h1>
      </section>
      <TopCarousel
        topCarousel={experiencesTopCarouselData.docs.sort(
          (a, b) => a.order - b.order
        )}
        locale={locale}
      />
      <BottomCarousel
        bottomCarousel={experiencesBottomCarouselData.docs.sort(
          (a, b) => a.order - b.order
        )}
        locale={locale}
      />
      {uniqueCountries
        .sort((a, b) =>
          a.localeCompare(b, "en", {
            sensitivity: "base",
          })
        )
        .map((country, i) => (
          <article
            key={country}
            className={cn("max-w-screen-8xl mx-auto px-4", i !== 0 && "mt-32")}
          >
            <h3 className="text-[2rem] font-semibold leading-normal text-left font-inter mb-2">
              {country}
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-x-4 gap-y-4 max-w-screen-8xl mx-auto text-[#404040] items-start">
              {experiencesData.docs
                .filter((experience) =>
                  experience.country.some((c) => c.name === country)
                )
                .map((experience) => (
                  <ExperienceCard key={experience.id} experience={experience} />
                ))}
            </ul>
          </article>
        ))}
    </main>
  );
};

export default page;
