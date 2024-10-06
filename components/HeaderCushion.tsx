"use client";

import { usePathname } from "@/i18n/routing";

const HeaderCushion = ({ disablePath }: { disablePath?: boolean }) => {
  const pathName = usePathname();

  if (pathName === "/" && !disablePath) return null;

  return <div className="h-[var(--header-height)]" />;
};

export default HeaderCushion;
