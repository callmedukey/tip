import FirstScreen from "@/components/main-page/FirstScreen";
import MainWrapper from "@/components/MainWrapper";

import { useTranslations } from "next-intl";

export default function Home({ params }: { params: { locale: string } }) {
  const t = useTranslations("HomePage");
  return (
    <MainWrapper className="relative isolated">
      12
      <FirstScreen />
    </MainWrapper>
  );
}
