import HotelCard from "./_components/HotelCard";
import { getLocale } from "next-intl/server";
import HotelCarousel from "./_components/HotelCarousel";

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

  const locale = await getLocale();
  return (
    <main className="py-16 font-inter px-4 max-w-screen-8xl mx-auto">
      <h1 className="text-center mx-auto text-white text-[1.25rem] lg:text-[2.5rem] font-normal leading-[3rem] mt-32 title-indicator">
        Immerse yourself in the modern <br className="hidden sm:block" />{" "}
        elegance of a personalized luxury <br className="hidden sm:block" /> and
        exceptional service.
      </h1>
      <article className="mt-[20rem] pt-[20rem]">
        <h2 className="text-[2rem] font-normal leading-normal text-center font-inter mt-60">
          저희 파트너 호텔에서 잊지 못할 좋은 시간 보내세요
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
      <article className="mt-32">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-x-4 gap-y-12 max-w-screen-8xl mx-auto text-[#404040] items-start">
          {partnerHotelsData.docs.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </ul>
      </article>
    </main>
  );
};

export default page;
