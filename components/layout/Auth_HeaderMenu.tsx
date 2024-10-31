"use client";

import LanguageSelectDropDown from "../LanguageSelectDropDown";
import { Link } from "@/i18n/routing";
import Auth_HeaderDropdownMenu from "./Auth_HeaderDropdownMenu";
import { useAuth } from "../context/AuthContext";
import { useTranslations } from "next-intl";

const Auth_HeaderMenu = () => {
  const [session] = useAuth();
  const t = useTranslations("AuthHeaderMenu");
  return (
    <div className="items-center lg:justify-center justify-end gap-2 flex">
      <LanguageSelectDropDown isMobile={false} />
      {session ? (
        <Auth_HeaderDropdownMenu />
      ) : (
        <>
          <Link href="/login">{t("login")}</Link>/
          <Link href="/signup">{t("signUp")}</Link>
        </>
      )}
    </div>
  );
};

export default Auth_HeaderMenu;
