"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const HeaderAboutMenu = () => {
  const t = useTranslations("Header");
  const router = useRouter();
  const pathname = usePathname();
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>{t("about")}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link href="/about">{t("about")}</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/about#membership"
            onClick={(e) => {
              e.preventDefault();
              const hash = window.location?.hash;
              if (pathname.includes("/about")) {
                history.scrollRestoration = "manual";
                window.scrollTo({
                  top: document.getElementById(hash.slice(1))?.offsetTop,
                  behavior: "smooth",
                });
              }
              if (!hash) {
                router.push("/about#membership");
              }
            }}
          >
            {t("membership")}
          </Link>
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
