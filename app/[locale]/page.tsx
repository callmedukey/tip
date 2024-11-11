import FirstScreen from "@/components/main-page/FirstScreen";
import MainWrapper from "@/components/MainWrapper";
import { PartnerCarousel } from "@/components/PartnerCarousel";

import { useTranslations } from "next-intl";

export default function Home({ params }: { params: { locale: string } }) {
  const t = useTranslations("HomePage");
  return (
    <MainWrapper className="relative isolated">
      <FirstScreen />
      <article className="flex flex-wrap justify-center gap-x-[clamp(4rem,10vw,8rem)] bg-white/65 lg:gap-y-4 gap-y-8 mx-auto px-4 py-2">
        <PartnerCarousel speed="slow" />
      </article>
    </MainWrapper>
  );
}
