"use client";
import Image from "next/image";
import BackgroundImage from "@/public/cloud-background.jpg";
import { usePathname } from "@/i18n/routing";
import { useParams } from "next/navigation";

const CloudBg = () => {
  const pathname = usePathname();
  const params = useParams();

  if (
    pathname.includes("/about") ||
    (pathname.includes("/experience-by-tip")) ||
    (pathname.includes("/partner-hotels"))
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
      className="print:hidden object-cover object-bottom lg:object-[100%_35%] 2xl:object-[100%_50%] -z-10"
    />
  );
};

export default CloudBg;
