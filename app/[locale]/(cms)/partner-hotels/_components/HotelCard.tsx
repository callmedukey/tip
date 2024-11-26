import Image from "next/image";
import type { PartnerHotel } from "../page";
import { getImageUrl } from "@/lib/cms";
import { Link } from "@/i18n/routing";
import { getLocale } from "next-intl/server";
import { ArrowRightIcon } from "lucide-react";

const HotelCard = async ({ hotel }: { hotel: PartnerHotel }) => {
  const locale = await getLocale();
  return (
    <li className="bg-white overflow-clip rounded-[1rem]">
      <Image
        src={getImageUrl(hotel.thumbnail.url)}
        alt={locale === "en" ? hotel.thumbnail.en_alt : hotel.thumbnail.kr_alt}
        width={hotel.thumbnail.width}
        height={hotel.thumbnail.height}
        quality={100}
        className="rounded-[1rem] h-60 sm:h-full sm:w-full"
      />
      <p className="text-[1.25rem] font-normal min-h-8 mt-2">
        {locale === "en" ? hotel.en_title : hotel.kr_title}
      </p>
      <Link
        href={`/partner-hotels/${hotel.slug}`}
        className="text-[0.75rem] text-[#404040] border !mt-2 border-[#404040] font-normal py-2 px-4 rounded-full w-28 flex items-center justify-between"
      >
        {locale === "en" ? "See more" : "더 보기"}
        <ArrowRightIcon className="w-4 h-4" strokeWidth={1} />
      </Link>
    </li>
  );
};

export default HotelCard;
