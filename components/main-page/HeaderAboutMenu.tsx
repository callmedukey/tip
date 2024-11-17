"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const HeaderAboutMenu = () => {
  const t = useTranslations("Header");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{t("about")}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link href="/about">{t("about")}</Link>
        </DropdownMenuItem>
        {/* <DropdownMenuItem asChild>
          <Link href="/blog">{t("blog")}</Link>
        </DropdownMenuItem> */}
        <DropdownMenuItem asChild>
          <Link href="/contact">{t("contact")}</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderAboutMenu;
