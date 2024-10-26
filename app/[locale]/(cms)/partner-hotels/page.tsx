import HotelCard from "./_components/HotelCard";
import { getImageUrl } from "@/lib/cms";
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
  const partnerHotelsCarousels = await fetch(
    "http://localhost:4000/api/partner-hotels-carousel?locale=undefined&draft=false&depth=1&limit=200",
    { cache: "no-store" }
  );
  const partnerHotelsCarouselsData: CMSCall<PartnerHotelCarousel> =
    await partnerHotelsCarousels.json();

  const partnerHotels = await fetch(
    "http://localhost:4000/api/partner-hotels?locale=undefined&draft=false&depth=1&limit=200",
    { cache: "no-store" }
  );
  const partnerHotelsData: CMSCall<PartnerHotel> = await partnerHotels.json();
  const locale = await getLocale();
  return (
    <main className="py-16 font-inter px-4 max-w-screen-8xl mx-auto">
      <h1 className="text-center mx-auto text-white text-[1.25rem] lg:text-[2.5rem] font-normal leading-[3rem] mt-32">
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
            hotelCarousel={partnerHotelsCarouselsData.docs}
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
