import React from "react";
import Rome from "@/public/rome.webp";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import About1 from "@/public/about-1.webp";
import About2 from "@/public/about-2.webp";
import About3 from "@/public/about-3.webp";
import About4 from "@/public/about-4.webp";
import BenefitPlane from "@/public/benefits/benefit-plane.png";
import BenefitDiscount from "@/public/benefits/benefit-dc.png";
import BenefitEnvelope from "@/public/benefits/benefit-envelope.png";
import BenefitGift from "@/public/benefits/benefit-gift.png";
import BenefitParty from "@/public/benefits/benefit-party.png";
import BenefitStars from "@/public/benefits/benefit-stars.png";
import BenefitCoupon from "@/public/benefits/benefit-coupon.png";
import BenefitPouch from "@/public/benefits/benefit-pouch.png";

import MembershipCard from "./_components/MembershipCard";

const AboutPage = async () => {
  const t = await getTranslations("aboutPage");
  const locale = await getLocale();

  return (
    <main className="text-[#404040] font-noto">
      <div className="relative min-h-[min(calc(100vh-var(--header-height)),60rem)] -mt-[var(--header-height)] flex justify-center bg-[#004ACA]/60 items-start px-4">
        <Image
          src={Rome}
          alt="About Img"
          placeholder="blur"
          fill
          priority
          quality={100}
          className="object-cover -z-10"
        />
        <h1 className="text-center font-garamond font-normal text-[2.5rem] mt-[20rem] text-white -translate-y-[5rem] title-indicator">
          <span className="italic block">Advantages of</span> Travel in Your
          Pocket
        </h1>
      </div>
      <article className="px-4 pt-32">
        <h2 className="text-[2.5rem] max-w-[69rem] mx-auto text-center font-inter">
          {locale === "ko" ? (
            <>
              <span className="font-bold">TIP</span>으로 여행 준비부터 일정 관리
              <br />
              맞춤 혜택까지 한눈에! <br />
              <span className="font-bold">특별한 추억을 오래 간직하세요</span>
            </>
          ) : (
            <>
              <span className="font-bold">Effortlessly</span> manage your travel
              plans and exclusive perks all in one place.{" "}
              <span className="font-bold">
                Make your memories last a lifetime
              </span>
            </>
          )}
        </h2>
        <div className="max-w-screen-8xl mx-auto about-section">
          <section className="max-h-[min(40vh, 30rem)] h-full">
            <Image
              src={About1}
              alt="Europe Holiday Location img"
              width={3400}
              height={2000}
              className="h-[500px] lg:basis-[40%] w-full shrink-1 grow-0 md:max-w-[850px] max-w-full object-cover object-center"
            />
            <div className="about-text-section">
              <p>
                <strong className="italic">{t("allinoneTitle")}</strong>
                <span className="mt-4 ">{t("allinoneDescription")}</span>
              </p>
            </div>
          </section>
          <section className="max-h-[min(40vh, 30rem)] h-full">
            <Image
              src={About2}
              alt="Europe Holiday Location img"
              width={3400}
              height={2000}
              className="h-[500px] lg:basis-[40%] w-full shrink-1 grow-0 md:max-w-[850px] max-w-full object-cover object-center"
            />
            <div className="about-text-section">
              <p>
                <strong className="">{t("secondTitle")}</strong>
                <span className="mt-4 ">{t("secondDescription")}</span>
              </p>
            </div>
          </section>
          <section className="max-h-[min(40vh, 30rem)] h-full">
            <Image
              src={About3}
              alt="Europe Holiday Location img"
              width={3400}
              height={2000}
              className="h-[500px] lg:basis-[40%] w-full shrink-1 grow-0 md:max-w-[850px] max-w-full object-cover object-center"
            />
            <div className="about-text-section">
              <p>
                <strong className="">{t("thirdTitle")}</strong>
                <span className="mt-4 ">{t("thirdDescription")}</span>
              </p>
            </div>
          </section>
          <section className="max-h-[min(40vh, 30rem)] h-full">
            <Image
              src={About4}
              alt="Europe Holiday Location img"
              width={3400}
              height={2000}
              className="h-[500px] lg:basis-[40%] w-full shrink-1 grow-0 md:max-w-[850px] max-w-full object-cover object-center"
            />
            <div className="about-text-section">
              <p>
                <strong className="">{t("fourthTitle")}</strong>
                <span className="mt-4 ">{t("fourthDescription")}</span>
              </p>
            </div>
          </section>
        </div>
      </article>
      <article className="px-4 pb-32">
        <h3 className="font-noto text-[2.5rem] text-center font-bold">
          {t("membershipTitle")}
        </h3>
        <p className="text-center text-[1.825rem] mt-4 font-noto max-w-[68rem] mx-auto">
          {t("membershipDescription")}
        </p>
        <ul className="mt-32 flex flex-wrap gap-16 justify-center items-start">
          <MembershipCard title="TIP WHITE" description={t("new")}>
            <li>
              <Image
                src={BenefitGift}
                alt="benefit"
                width={30}
                height={30}
                className="size-[1.825rem]"
              />
              <span>
                {locale === "ko"
                  ? "WHITE 웰컴팩 증정"
                  : "WHITE welcome pack basic offer"}
              </span>
            </li>
            <li>
              <Image
                src={BenefitCoupon}
                alt="benefit"
                width={30}
                height={30}
                className="size-[1.825rem]"
              />
              <span>
                {locale === "ko"
                  ? "5% discount coupon after the 1st payment"
                  : "Plane Reservation Discount"}
              </span>
            </li>
            <li>
              <Image
                src={BenefitEnvelope}
                alt="benefit"
                width={30}
                height={30}
                className="size-[1.825rem]"
              />
              <span>
                {locale === "ko"
                  ? "1회 일주일 뉴스레터 발송"
                  : "Weekly newsletter"}
              </span>
            </li>
          </MembershipCard>
          <MembershipCard title="TIP BLUE" description={t("20mil")}>
            <li>
              <Image
                src={BenefitGift}
                alt="benefit"
                width={30}
                height={30}
                className="size-[1.825rem]"
              />
              <span className="whitespace-pre-line">
                {locale === "ko"
                  ? "BLUE 웰컴팩 증정,  5성급 이상 호텔 할인 4%"
                  : "BLUE welcome pack \n 4% discound on 5 star hotels and above"}
              </span>
            </li>
            <li>
              <Image
                src={BenefitPouch}
                alt="benefit"
                width={30}
                height={30}
                className="size-[1.825rem]"
              />
              <span>
                {locale === "ko"
                  ? "여행시 휴대용 파우치 증정"
                  : "Free phone pouch"}
              </span>
            </li>
            <li>
              <Image
                src={BenefitEnvelope}
                alt="benefit"
                width={30}
                height={30}
                className="size-[1.825rem]"
              />
              <span>
                {locale === "ko"
                  ? "1회 일주일 뉴스레터 발송"
                  : "Weekly newsletter"}
              </span>
            </li>
          </MembershipCard>
          <MembershipCard title="TIP BLACK" description={t("50mil")}>
            <li>
              <Image
                src={BenefitGift}
                alt="benefit"
                width={30}
                height={30}
                className="size-[1.825rem]"
              />
              <span className="whitespace-pre-line">
                {locale === "ko"
                  ? "BLACK 웰컴팩 증정 \n 5성급 이상 호텔 할인 5%"
                  : "BLACK welcome pack, 5% discound on 5 star hotels"}
              </span>
            </li>
            <li>
              <Image
                src={BenefitPouch}
                alt="benefit"
                width={30}
                height={30}
                className="size-[1.825rem]"
              />
              <span>
                {locale === "ko"
                  ? "여행시 휴대용 파우치 증정"
                  : "Free phone pouch"}
              </span>
            </li>
            <li>
              <Image
                src={BenefitDiscount}
                alt="benefit"
                width={30}
                height={30}
                className="size-[1.825rem]"
              />
              <span>
                {locale === "ko"
                  ? "전 여행 5% 할인"
                  : "5% discount on all travels "}
              </span>
            </li>
          </MembershipCard>
          <MembershipCard title="TIP GOLD" description={t("100mil")}>
            <li>
              <Image
                src={BenefitGift}
                alt="benefit"
                width={30}
                height={30}
                className="size-[1.825rem]"
              />
              <span className="whitespace-pre-line">
                {locale === "ko"
                  ? "GOLD 웰컴팩 증정, 5성급 이상 호텔 할인 7%"
                  : "GOLD welcome pack \n 7% discound on 5 star hotels and above"}
              </span>
            </li>
            <li>
              <Image
                src={BenefitParty}
                alt="benefit"
                width={30}
                height={30}
                className="size-[1.825rem]"
              />
              <span>
                {locale === "ko"
                  ? "생일 및 명절 기념 선물 패키지. VIP행사 초청 이벤트"
                  : "Gift package during birthdays and Chinese new year. Get special invitations to VIP events"}
              </span>
            </li>
            <li>
              <Image
                src={BenefitPlane}
                alt="benefit"
                width={30}
                height={30}
                className="size-[1.825rem]"
              />
              <span>
                {locale === "ko"
                  ? "공항 도착시 각 나라 Greeting 서비스 제공"
                  : "Airport pickups at every country"}
              </span>
            </li>
            <li>
              <Image
                src={BenefitStars}
                alt="benefit"
                width={30}
                height={30}
                className="size-[1.825rem]"
              />
              <span>
                {locale === "ko"
                  ? "크루즈 등 특별 여행 서비스 특급 할인 적용"
                  : "Discounts for cruise tours and special activities"}
              </span>
            </li>
            <li>
              <Image
                src={BenefitEnvelope}
                alt="benefit"
                width={30}
                height={30}
                className="size-[1.825rem]"
              />
              <span>
                {locale === "ko"
                  ? "골드 등급 이상 멤버 Exclusive Newsletter 발송 [특별 할인 및 기본 여행지 외 럭셔리 여행지 소개]"
                  : "Exclusive Newsletter for GOLD members and above [Special discounts and get updates on luxury destinations]"}
              </span>
            </li>
          </MembershipCard>
          <MembershipCard title="TIP DIAMOND" description={t("500mil")}>
            <li>
              <Image
                src={BenefitGift}
                alt="benefit"
                width={30}
                height={30}
                className="size-[1.825rem]"
              />
              <span className="whitespace-pre-line">
                {locale === "ko"
                  ? "GOLD 웰컴팩 증정, 5성급 이상 호텔 할인 7%"
                  : "Diamond welcome pack \n 10% discount with max limit + 5% no limit"}
              </span>
            </li>
            <li>
              <Image
                src={BenefitParty}
                alt="benefit"
                width={30}
                height={30}
                className="size-[1.825rem]"
              />
              <span>
                {locale === "ko"
                  ? "생일 및 명절 기념 선물 패키지. VIP행사 초청 이벤트"
                  : "Gift package during birthdays and Chinese new year. Get special invitations to VIP events"}
              </span>
            </li>
            <li>
              <Image
                src={BenefitDiscount}
                alt="benefit"
                width={30}
                height={30}
                className="size-[1.825rem]"
              />
              <span>
                {locale === "ko"
                  ? "1년 1회 럭셔리 호텔 20% 할인 제공"
                  : "Yearly 20% discount to luxury hotels"}
              </span>
            </li>
            <li>
              <Image
                src={BenefitPlane}
                alt="benefit"
                width={30}
                height={30}
                className="size-[1.825rem]"
              />
              <span>
                {locale === "ko"
                  ? "공항 도착시 각 나라 Greeting 서비스 제공"
                  : "Airport pickups at every country"}
              </span>
            </li>
            <li>
              <Image
                src={BenefitStars}
                alt="benefit"
                width={30}
                height={30}
                className="size-[1.825rem]"
              />
              <span>
                {locale === "ko"
                  ? "크루즈 등 특별 여행 서비스 특급 할인 적용"
                  : "Discounts for cruise tours and special activities"}
              </span>
            </li>
            <li>
              <Image
                src={BenefitEnvelope}
                alt="benefit"
                width={30}
                height={30}
                className="size-[1.825rem]"
              />
              <span>
                {locale === "ko"
                  ? "골드 등급 이상 멤버 Exclusive Newsletter 발송 [특별 할인 및 기본 여행지 외 럭셔리 여행지 소개]"
                  : "Exclusive Newsletter for GOLD members and above [Special discounts and get updates on luxury destinations]"}
              </span>
            </li>
          </MembershipCard>
        </ul>
      </article>
    </main>
  );
};

export default AboutPage;
