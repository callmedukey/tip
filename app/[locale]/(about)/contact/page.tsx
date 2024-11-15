import { useTranslations } from "next-intl";
import Tower from "@/public/paris-tower.webp";
import Image from "next/image";
import ContactForm from "./_components/ContactForm";

const ContactPage = () => {
  const t = useTranslations("ContactPage");
  return (
    <main className="min-h-[calc(100vh-var(--header-height))] py-16 px-4">
      <article className="relative max-w-screen-8xl mx-auto h-full rounded-2xl overflow-hidden grid lg:grid-cols-2">
        <Image
          src={Tower}
          alt="Tower"
          className="object-cover lg:object-center object-left -z-10"
          fill
        />
        <div className="hidden lg:block" />
        <div className="bg-white/85 lg:p-8 p-4">
          <h1 className="text-[1.875rem] font-normal text-center">
            {t("contact")}
          </h1>
          <ContactForm />
        </div>
      </article>
    </main>
  );
};

export default ContactPage;
