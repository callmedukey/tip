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
    <li className="space-y-8 bg-white rounded-[2rem]">
      <Link href={`/experience-by-tip/${experience.slug}`} className="">
        <div className="w-full h-[450px] md:h-[550px] lg:h-[650px]">
          <Image
            src={getImageUrl(experience.thumbnail.url)}
            alt={
              locale === "en"
                ? experience.thumbnail.en_alt
                : experience.thumbnail.kr_alt
            }
            width={experience.thumbnail.width}
            height={experience.thumbnail.height}
            quality={100}
            className="w-full rounded-[2rem] h-full object-fill"
          />
        </div>
        <p className="text-[1.5rem] font-normal min-h-16 mt-4">
          {locale === "en" ? experience.en_title : experience.kr_title}
        </p>
      </Link>
    </li>
  );
};

export default ExperienceCard;
