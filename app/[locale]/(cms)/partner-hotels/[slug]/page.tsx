import { baseUrl } from "@/lib/utils";
import type { Metadata, ResolvingMetadata } from "next";
import type { CMSCall, PartnerHotel } from "../page";
import { getLocale } from "next-intl/server";
import ContentRenderer from "@/components/ContentRenderer";
import qs from "qs";
export const revalidate = 60 * 60 * 30;
import BackgroundImage from "@/public/second-bg.png";
import Image from "next/image";
type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;
  const locale = await getLocale();
  // fetch data
  const data: CMSCall<PartnerHotel> = await fetch(
    `${baseUrl}/api/partner-hotels?${qs.stringify({
      where: {
        slug: { equals: slug },
      },
    })}`,
    {
      cache: "no-store",
    }
  ).then((res) => res.json());

  // optionally access and extend (rather than replace) parent metadata
  return {
    title: locale === "en" ? data.docs[0].en_title : data.docs[0].kr_title,
    keywords:
      locale === "en" ? data.docs[0].en_keywords : data.docs[0].kr_keywords,
  };
}

const page = async ({ params }: { params: { slug: string } }) => {
  const locale = await getLocale();
  const slug = params.slug;

  const query = {
    slug: { equals: slug },
  };

  const data: CMSCall<PartnerHotel> = await fetch(
    `${baseUrl}/api/partner-hotels?${qs.stringify({
      where: query,
    })}`
  ).then((res) => res.json());

  return (
    <main className="py-16 font-inter lg:px-4 relative mt-[-5rem] ">
      <Image
        src={BackgroundImage}
        alt="Another Cloud Background"
        fill
        quality={100}
        priority
        placeholder="blur"
        className="object-cover object-center -z-10 lg:max-h-[100rem] max-h-[70rem]"
      />
      <h1 className="text-center mx-auto text-white text-[1.25rem] lg:text-[2.5rem] font-normal mt-32 title-indicator font-garamond tracking-normal">
        For your travel, <br />{" "}
        <i className="italic">Your place to stay is the most important.</i>{" "}
        <br /> Our partner hotels are here to provide you with precious time.
      </h1>
      <section className="py-16 lg:mt-[30rem] mt-[12rem] sm:mt-[min(15rem,35vh)]">
        <article className="rounded-md max-w-7xl mx-auto bg-gradient-to-b from-white/75 to-white/100 overflow-clip">
          <div className="rounded-md mt-8 whitespace-pre-wrap text-center">
            {locale === "en" ? (
              <ContentRenderer content={data.docs[0].en_content} />
            ) : (
              <ContentRenderer content={data.docs[0].kr_content} />
            )}
          </div>
        </article>
      </section>
    </main>
  );
};

export default page;
