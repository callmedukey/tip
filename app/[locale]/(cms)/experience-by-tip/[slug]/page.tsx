import { baseUrl } from "@/lib/utils";
import type { Metadata, ResolvingMetadata } from "next";
import { getLocale } from "next-intl/server";
import ContentRenderer from "@/components/ContentRenderer";
import { type CMSCall } from "../../partner-hotels/page";
import { type ExperienceData } from "../page";
import qs from "qs";

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
    <main className="py-16 px-4">
      <article className="rounded-md max-w-7xl mx-auto bg-gradient-to-b from-white/75 to-white/100">
        <section className="p-4 rounded-md my-8 whitespace-pre-wrap  text-center">
          {locale === "en" ? (
            <ContentRenderer content={data.docs[0].en_content} />
          ) : (
            <ContentRenderer content={data.docs[0].kr_content} />
          )}
        </section>
      </article>
    </main>
  );
};

export default page;
