import Image from "next/image";
import type { ExperienceData } from "../page";
import { Link } from "@/i18n/routing";
import { getLocale } from "next-intl/server";
import { getImageUrl } from "@/lib/cms";

const ExperienceCard = async ({
  experience,
}: {
  experience: ExperienceData;
}) => {
  const locale = await getLocale();
  return (
    <li className="space-y-8 bg-white overflow-clip rounded-[1rem]">
      <Link href={`/experience-by-tip/${experience.slug}`} className="">
        <Image
          src={getImageUrl(experience.thumbnail.url)}
          // src={experience.thumbnail.url}
          alt={
            locale === "en"
              ? experience.thumbnail.en_alt
              : experience.thumbnail.kr_alt
          }
          width={experience.thumbnail.width}
          height={experience.thumbnail.height}
          quality={100}
          className="rounded-[1rem] w-full h-full object-cover"
        />
        <p className="text-[1.5rem] font-normal h-32">
          {locale === "en" ? experience.en_title : experience.kr_title}
        </p>
      </Link>
    </li>
  );
};

export default ExperienceCard;
