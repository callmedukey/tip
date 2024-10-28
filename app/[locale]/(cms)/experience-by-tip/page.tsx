import React from "react";
import Image from "next/image";
import BackgroundImage from "@/public/experiences-banner.png";
import { getLocale } from "next-intl/server";
import type { CMSCall, PartnerHotelThumbnail } from "../partner-hotels/page";
import TopCarousel from "./_components/TopCarousel";
import BottomCarousel from "./_components/BottomCarousel";
import ExperienceCard from "./_components/ExperienceCard";
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
  en_content: string;
  kr_title: string;
  kr_content: string;
  thumbnail: PartnerHotelThumbnail;
  slug: string;
  en_keywords: string;
  kr_keywords: string;
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

  return (
    <main>
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
        <h1 className="text-center mx-auto text-white text-[1.25rem] lg:text-[2.5rem] font-normal leading-[3rem] mt-32 title-indicator">
          Enjoy the diverse experiences <br /> that Europe has to offer
        </h1>
      </section>
      <TopCarousel
        topCarousel={experiencesTopCarouselData.docs}
        locale={locale}
      />
      <BottomCarousel
        bottomCarousel={experiencesBottomCarouselData.docs}
        locale={locale}
      />
      <article className="mt-32 px-4">
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-x-4 gap-y-12 max-w-screen-8xl mx-auto text-[#404040] items-start">
          {experiencesData.docs.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </ul>
      </article>
    </main>
  );
};

export default page;