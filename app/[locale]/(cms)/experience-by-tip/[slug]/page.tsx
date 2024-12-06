import { baseUrl } from "@/lib/utils";
import type { Metadata, ResolvingMetadata } from "next";
import { getLocale } from "next-intl/server";
import ContentRenderer from "@/components/ContentRenderer";
import { type CMSCall } from "../../partner-hotels/page";
import { type ExperienceData } from "../page";
import qs from "qs";
import BackgroundImage from "@/public/second-bg.png";
import Image from "next/image";

export const revalidate = 60 * 60 * 30;

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
  const query = {
    slug: { equals: slug },
  };

  // fetch data
  const data: CMSCall<ExperienceData> = await fetch(
    `${baseUrl}/api/experiences?${qs.stringify({
      where: query,
    })}`
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
  const data: CMSCall<ExperienceData> = await fetch(
    `${baseUrl}/api/experiences?${qs.stringify({
      where: query,
    })}`,
    {
      cache: "no-store",
    }
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
      <h1 className="text-center mx-auto text-white text-[1.25rem] text-pretty lg:text-[2.5rem] font-normal mt-32 title-indicator font-garamond tracking-normal">
        We offer unique experiences tailored just for you,{" "}
        <br className="hidden sm:block" />
        <span className="italic">beyond the ordinary journey.</span>
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
