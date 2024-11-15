import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Diamond from "@/public/diamond.png";

const MembershipCard = async ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) => {
  const t = await getTranslations("aboutPage");
  return (
    <li
      data-color={title}
      className="flex-1 basis-[436px] max-w-[436px] sm:min-w-[436px]"
    >
      <div className="flex border-b border-[#B0B0B0] justify-between p-4">
        <span className="font-medium">{title}</span>
        <span className="font-inter flex items-center gap-4">
          {title === "TIP DIAMOND" && (
            <Image
              src={Diamond}
              alt="diamond"
              width={252}
              height={208}
              className="w-[32px] scale-125"
            />
          )}
          {description}
        </span>
      </div>
      <div className="p-4">
        <span className="block underline font-bold font-noto">
          {t("benefit")}
        </span>
        <ul className="py-4 membership-card-list">{children}</ul>
      </div>
    </li>
  );
};

export default MembershipCard;
