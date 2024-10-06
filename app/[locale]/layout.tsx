import Header from "@/components/Header";
import { ThemeModeScript } from "flowbite-react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Image from "next/image";
import BackgroundImage from "@/public/cloud-background.jpg";
import {
  Inter as InterFont,
  Noto_Sans_KR as NotoSansKrFont,
} from "next/font/google";
import localFont from "next/font/local";
import HeaderCushion from "@/components/HeaderCushion";
import AuthContextProvider from "@/components/context/AuthContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactQueryContext from "@/components/context/ReactQueryContext";
const Inter = InterFont({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const Pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
  style: "normal",
});

const NotoSansKr = NotoSansKrFont({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans-kr",
});

export default async function Layout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <ThemeModeScript />
      </head>
      <body
        className={`${Inter.variable} ${Pretendard.variable} ${NotoSansKr.variable} antialiased relative isolated bg-white break-keep lg:min-h-[min(100vh,80rem)]`}
      >
        <Image
          src={BackgroundImage}
          alt="Cloud Background"
          fill
          quality={100}
          priority
          placeholder="blur"
          className="object-cover object-bottom lg:object-[100%_35%] 2xl:object-[100%_50%] -z-10"
        />

        <ReactQueryContext>
          <NextIntlClientProvider messages={messages}>
            <AuthContextProvider>
              <Header />
              <HeaderCushion />
              {children}
            </AuthContextProvider>
          </NextIntlClientProvider>
        </ReactQueryContext>
      </body>
    </html>
  );
}
