"use client";
import Image from "next/image";
import BackgroundImage from "@/public/cloud-background.jpg";
import { usePathname } from "@/i18n/routing";

const CloudBg = () => {
  const pathname = usePathname();

  if (
    pathname.includes("/experience-by-tip") ||
    pathname.includes("/partner-hotels")
  ) {
    return null;
  }

  return (
    <Image
      src={BackgroundImage}
      alt="Cloud Background"
      fill
      quality={100}
      priority
      placeholder="blur"
      className="object-cover object-bottom lg:object-[100%_35%] 2xl:object-[100%_50%] -z-10"
    />
  );
};

export default CloudBg;
