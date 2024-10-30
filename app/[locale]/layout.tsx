import Header from "@/components/Header";
import { ThemeModeScript } from "flowbite-react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import {
  Inter as InterFont,
  Noto_Sans_KR as NotoSansKrFont,
} from "next/font/google";
import localFont from "next/font/local";
import HeaderCushion from "@/components/HeaderCushion";
import AuthContextProvider from "@/components/context/AuthContext";
import ReactQueryContext from "@/components/context/ReactQueryContext";
import GoogleProvider from "@/components/context/GoogleProvider";
import CloudBg from "./_layout-components/CloudBg";
import Footer from "@/components/Footer";
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
        <GoogleProvider>
          <ReactQueryContext>
            <NextIntlClientProvider messages={messages}>
              <AuthContextProvider>
                <Header />
                <HeaderCushion />
                <CloudBg />
                {children}
                <Footer />
              </AuthContextProvider>
            </NextIntlClientProvider>
          </ReactQueryContext>
        </GoogleProvider>
      </body>
    </html>
  );
}
