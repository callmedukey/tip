import Logo from "@/public/logo.png";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import MobileMenu from "./layout/MobileMenu";
import Auth_HeaderMenu from "./layout/Auth_HeaderMenu";
import { getTranslations } from "next-intl/server";
import HeaderAboutMenu from "./HeaderAboutMenu";

const Header = async () => {
  const t = await getTranslations("Header");
  return (
    <header className="print:hidden bg-transparent absolute top-0 left-0 right-0 z-10 grid grid-cols-[1fr,auto,1fr] text-white oneOneToFive grid-rows-[var(--header-height)] px-4 lg:px-0">
      <div className="col-start-1 col-end-2 lg:hidden flex items-center justify-start">
        <MobileMenu />
      </div>
      <Link
        href="/"
        className="col-start-2 col-end-3 lg:col-start-1 lg:col-end-2 lg:justify-self-start"
      >
        <Image
          priority
          alt="Logo"
          src={Logo}
          width={99}
          height={99}
          className="outline"
        />
      </Link>
      <nav className="items-center gap-8 hidden lg:flex font-normal text-[1.125rem]">
        <Link href="/my-travel" prefetch={false}>
          {t("myTravel")}
        </Link>
        <Link href="/partner-hotels">{t("partnerHotels")}</Link>
        <Link href="/experience-by-tip">{t("experienceByTip")}</Link>
        <HeaderAboutMenu />
      </nav>
      <Auth_HeaderMenu />
    </header>
  );
};

export default Header;
