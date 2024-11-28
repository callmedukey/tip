import { getLocale, getTranslations } from "next-intl/server";
import HotelCarousel from "./_components/HotelCarousel";
import Image from "next/image";
import BackgroundImage from "@/public/second-bg.png";

import HotelsContainer from "./_components/HotelsContainer";

export const dynamic = "force-dynamic";

export type PartnerHotelCarousel = {
  id: number;
  en_title: string;
  kr_title: string;
  en_subText: string;
  kr_subText: string;
  link: string;
  leftThumbnail: PartnerHotelThumbnail;
  centerThumbnail: PartnerHotelThumbnail;
  rightThumbnail: PartnerHotelThumbnail;
  order: number;
  updatedAt: string;
  createdAt: string;
};

export type CMSCall<T> = {
  docs: T[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: number | null;
  page: number;
  pagingCounter: number;
  prevPage: number | null;
  totalDocs: number;
  totalPages: number;
};

export type PartnerHotel = {
  id: number;
  en_title: string;
  kr_title: string;
  slug: string;
  en_keywords: string;
  kr_keywords: string;
  thumbnail: PartnerHotelThumbnail;
  en_content: any[];
  kr_content: any[];
  updatedAt: string;
  createdAt: string;
  country: {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  };
};

export type PartnerHotelThumbnail = {
  id: number;
  en_alt: string;
  kr_alt: string;
  updatedAt: string;
  createdAt: string;
  url: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  focalX: number;
  focalY: number;
};

const page = async () => {
  const t = await getTranslations("partnerHotels");
  const [partnerHotelsCarousels, partnerHotels] = await Promise.all([
    fetch(
      "http://localhost:4000/api/partner-hotels-carousel?locale=undefined&draft=false&depth=1&limit=200",
      { cache: "no-store" }
    ),
    fetch(
      "http://localhost:4000/api/partner-hotels?locale=undefined&draft=false&depth=1&limit=200",
      { cache: "no-store" }
    ),
  ]);
  const partnerHotelsCarouselsData: CMSCall<PartnerHotelCarousel> =
    await partnerHotelsCarousels.json();
  const partnerHotelsData: CMSCall<PartnerHotel> = await partnerHotels.json();

  const partnerHotelsDataDummy: CMSCall<PartnerHotel> = {
    docs: [
      {
        id: 1,
        en_title: "Hotel 1",
        kr_title: "호텔 1",
        slug: "hotel-1",
        en_keywords: "hotel, 1",
        kr_keywords: "호텔, 1",
        en_content: [],
        kr_content: [],
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        thumbnail: {
          id: 1,
          en_alt: "Hotel 1",
          kr_alt: "호텔 1",
          updatedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          url: "/dummy/dummy-hotel-1.png",
          filename: "hotel-1.jpg",
          mimeType: "image/jpeg",
          filesize: 1000,
          width: 150,
          height: 150,
          focalX: 0.5,
          focalY: 0.5,
        },
        country: {
          id: 1,
          name: "South Korea",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
      {
        id: 1,
        en_title: "Hotel de crillon, a rosewood hotel",
        kr_title: "Hotel de crillon, a rosewood hotel",
        slug: "hotel-1",
        en_keywords: "hotel, 1",
        kr_keywords: "호텔, 1",
        en_content: [],
        kr_content: [],
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        thumbnail: {
          id: 1,
          en_alt: "Hotel 1",
          kr_alt: "호텔 1",
          updatedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          url: "/dummy/dummy-hotel-2.png",
          filename: "hotel-1.jpg",
          mimeType: "image/jpeg",
          filesize: 1000,
          width: 150,
          height: 150,
          focalX: 0.5,
          focalY: 0.5,
        },
        country: {
          id: 1,
          name: "USA",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
      {
        id: 1,
        en_title: "Madame Reve Hotel Paris",
        kr_title: "Madame Reve Hotel Paris",
        slug: "hotel-1",
        en_keywords: "hotel, 1",
        kr_keywords: "호텔, 1",
        en_content: [],
        kr_content: [],
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        thumbnail: {
          id: 1,
          en_alt: "Hotel 1",
          kr_alt: "호텔 1",
          updatedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          url: "/dummy/dummy-hotel-3.png",
          filename: "hotel-1.jpg",
          mimeType: "image/jpeg",
          filesize: 1000,
          width: 150,
          height: 150,
          focalX: 0.5,
          focalY: 0.5,
        },
        country: {
          id: 1,
          name: "India",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
      {
        id: 1,
        en_title: "Madame Reve Hotel Paris",
        kr_title: "Madame Reve Hotel Paris",
        slug: "hotel-1",
        en_keywords: "hotel, 1",
        kr_keywords: "호텔, 1",
        en_content: [],
        kr_content: [],
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        thumbnail: {
          id: 1,
          en_alt: "Madame Reve Hotel Paris",
          kr_alt: "Madame Reve Hotel Paris",
          updatedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          url: "/dummy/dummy-hotel-4.png",
          filename: "hotel-1.jpg",
          mimeType: "image/jpeg",
          filesize: 1000,
          width: 150,
          height: 150,
          focalX: 0.5,
          focalY: 0.5,
        },
        country: {
          id: 1,
          name: "Germany",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    ],
    hasNextPage: false,
    hasPrevPage: false,
    limit: 200,
    nextPage: null,
    page: 1,
    pagingCounter: 1,
    prevPage: null,
    totalDocs: 1,
    totalPages: 1,
  };
  const partnerHotelsCarouselsDataDummy: CMSCall<PartnerHotelCarousel> = {
    docs: [
      {
        id: 1,
        en_title: "Hotel 1",
        kr_title: "호텔 1",
        en_subText: "Hotel 1",
        kr_subText: "호텔 1",
        link: "/dummy/dummy-hotel-1",
        order: 1,
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        leftThumbnail: {
          id: 1,
          en_alt: "Hotel 1",
          kr_alt: "호텔 1",
          updatedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          url: "/dummy/dummy-hotel-carousel-1.png",
          filename: "hotel-1.jpg",
          mimeType: "image/jpeg",
          filesize: 1000,
          width: 150,
          height: 150,
          focalX: 0.5,
          focalY: 0.5,
        },
        centerThumbnail: {
          id: 1,
          en_alt: "Hotel 1",
          kr_alt: "호텔 1",
          updatedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          url: "/dummy/dummy-hotel-carousel-2.png",
          filename: "hotel-1.jpg",
          mimeType: "image/jpeg",
          filesize: 1000,
          width: 150,
          height: 150,
          focalX: 0.5,
          focalY: 0.5,
        },
        rightThumbnail: {
          id: 1,
          en_alt: "Hotel 1",
          kr_alt: "호텔 1",
          updatedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          url: "/dummy/dummy-hotel-carousel-3.png",
          filename: "hotel-1.jpg",
          mimeType: "image/jpeg",
          filesize: 1000,
          width: 150,
          height: 150,
          focalX: 0.5,
          focalY: 0.5,
        },
      },
      {
        id: 2,
        en_title: "Hotel 1",
        kr_title: "호텔 1",
        en_subText: "Hotel 1-2",
        kr_subText: "호텔 1-2",
        link: "/dummy/dummy-hotel-1",
        order: 1,
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        leftThumbnail: {
          id: 1,
          en_alt: "Hotel 1-2",
          kr_alt: "호텔 1-2",
          updatedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          url: "/dummy/dummy-hotel-1.png",
          filename: "hotel-1.jpg",
          mimeType: "image/jpeg",
          filesize: 1000,
          width: 150,
          height: 150,
          focalX: 0.5,
          focalY: 0.5,
        },
        centerThumbnail: {
          id: 1,
          en_alt: "Hotel 1-2",
          kr_alt: "호텔 1-2",
          updatedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          url: "/dummy/dummy-hotel-2.png",
          filename: "hotel-1.jpg",
          mimeType: "image/jpeg",
          filesize: 1000,
          width: 150,
          height: 150,
          focalX: 0.5,
          focalY: 0.5,
        },
        rightThumbnail: {
          id: 1,
          en_alt: "Hotel 1",
          kr_alt: "호텔 1",
          updatedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          url: "/dummy/dummy-hotel-3.png",
          filename: "hotel-1.jpg",
          mimeType: "image/jpeg",
          filesize: 1000,
          width: 150,
          height: 150,
          focalX: 0.5,
          focalY: 0.5,
        },
      },
    ],
    hasNextPage: false,
    hasPrevPage: false,
    limit: 200,
    nextPage: null,
    page: 1,
    pagingCounter: 1,
    prevPage: null,
    totalDocs: 1,
    totalPages: 1,
  };

  const countries = partnerHotelsData.docs
    .map((hotel) => hotel.country?.name)
    .sort((a, b) => a.localeCompare(b));

  const uniqueCountries = [...new Set(countries)];
  const locale = await getLocale();

  return (
    <main className="py-16 font-inter px-4 relative mt-[-5rem]">
      <Image
        src={BackgroundImage}
        alt="Another Cloud Background"
        fill
        quality={100}
        priority
        placeholder="blur"
        className="object-cover object-center -z-10 lg:max-h-[100rem] max-h-[70rem]"
      />
      <h1 className="text-center mx-auto text-white text-[1.25rem] lg:text-[2.5rem] font-normal mt-32 title-indicator font-garamond tracking-normal">
        For your travel, <br />{" "}
        <i className="italic">Your place to stay is the most important.</i>{" "}
        <br /> Our partner hotels are here to provide you with precious time.
      </h1>
      <article className="lg:mt-[35rem]">
        <h2 className="lg:text-[2rem] text-[1.5rem] font-normal px-4 leading-normal text-center mt-72 max-w-4xl mx-auto font-garamond">
          {locale === "ko" ? (
            <span className="text-pretty">
              엄선된 호텔들을 소개 드립니다. <br className="hidden sm:block" />{" "}
              많은 할인과 혜택으로 좋은 추억만{" "}
              <br className="hidden sm:block" /> 만들어 가시길 바라겠습니다.
            </span>
          ) : (
            <span>
              We are pleased to introduce a selection of carefully curated
              hotels. <br /> We hope you create wonderful memories with great
              discounts and benefits.
            </span>
          )}
        </h2>
        {/* {carousel goes here} */}
        <section>
          <HotelCarousel
            hotelCarousel={partnerHotelsCarouselsData.docs.sort(
              (a, b) => a.order - b.order
            )}
            locale={locale}
          />
        </section>
      </article>
      
      <HotelsContainer
        uniqueCountries={uniqueCountries}
        partnerHotelsData={partnerHotelsData}
        locale={locale}
      />
    </main>
  );
};

export default page;
