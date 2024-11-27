import { getLocale } from "next-intl/server";
import Image from "next/image";
import KoreanFlag from "@/public/south-korea.svg";
import FrenchFlag from "@/public/france.svg";
import Logo from "@/public/logo.png";
// —— 영어 사이트
// � PARIS CLASS

// 통신판매업 신고 번호 : 2023-서울중구-1031

const Footer = async () => {
  const locale = await getLocale();

  return (
    <footer className="bg-[#1E4B8E] px-4 pb-6 lg:pb-0 font-inter text-white standalone:hidden">
      <div className="max-w-7xl mx-auto hidden lg:block">
        <div className="grid sm:grid-cols-2 gap-6 mt-4 lg:mt-0">
          {locale === "ko" ? (
            <ul className="place-self-start translate-y-4">
              <li className="font-semibold flex items-center gap-2">
                <Image
                  src={KoreanFlag}
                  alt="Korean Flag"
                  width={512}
                  height={512}
                  className="w-[4rem] h-[2rem] mx-[-1rem]"
                />
                트래블 인 유어 포켓
              </li>
              <li>(주) 파리클래스 / 대표자 : 손한나</li>
              <li> 사업자 번호 887-86-03126</li>
              <li>주소 : 서울 특별시 중구 퇴계로 286, 6층 6063호</li>
              <li>연락처 : 010-8005-3936 (한국) +33 6 95 96 39 88 (파리)</li>
            </ul>
          ) : (
            <ul className="place-self-start translate-y-4">
              <li className="font-semibold flex items-center gap-2">
                <Image
                  src={KoreanFlag}
                  alt="Korean Flag"
                  width={512}
                  height={512}
                  className="w-[4rem] h-[2rem] mx-[-1rem]"
                />
                PARIS CLASS
              </li>
              <li>Luxury travel agency</li>
              <li>Certified Number # 887-86-03126</li>
              <li>
                Address : 286, Toegye-ro, Jung-gu, Seoul, Republic of Korea
              </li>
              <li>Contact : (KR) +82 10-8005-3936</li>
            </ul>
          )}
          <div className="flex flex-col items-start justify-center sm:place-self-end sm:self-start order-3 sm:order-2">
            <Image
              src={Logo}
              alt="Paris Class Logo"
              width={100}
              height={100}
              className="translate-x-[-24px] mr-auto ml-0"
            />
            <div className="flex items-start gap-4 pb-6">
              {/* Instagram */}
              <a
                href="https://instagram.com/travelinyourpocket_official"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="size-8 fill-white hover:fill-black duration-300 transition-colors"
                >
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                </svg>
              </a>
              {/* Facebook */}
              <a
                href="https://www.facebook.com/profile.php?id=61568543512653"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="size-8 fill-white hover:fill-black duration-300 transition-colors"
                >
                  <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64h98.2V334.2H109.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H255V480H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/travel-in-your-pocket"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="size-8 fill-white hover:fill-black duration-300 transition-colors"
                >
                  <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
                </svg>
              </a>
              {/* Twitter X */}
              <a
                href="https://x.com/parisclass_tip"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="size-8 fill-white hover:fill-black duration-300 transition-colors"
                >
                  <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                </svg>
              </a>
            </div>
            <div className="flex items-start justify-center flex-col text-sm">
              <div>통신판매업 신고 번호 : 2023-서울중구-1031</div>
              {locale === "ko" && (
                <>
                  <div>예금주 : (주) 파리클래스</div>
                  <div>하나은행 15591004663104</div>
                </>
              )}
              <div className="text-center text-xs mt-4">
                &copy; 2024 Paris Class. All rights reserved.
              </div>
            </div>
          </div>
          {locale === "ko" ? (
            <ul className="order-2 sm:order-3 -translate-y-20">
              <li className="font-semibold flex items-center gap-2">
                <Image
                  src={FrenchFlag}
                  alt="French Flag"
                  width={30}
                  height={20}
                  className="w-[4rem] h-[2rem] mx-[-1rem]"
                />
                Parisian agency
              </li>
              <li>21 Rue du Clos Feuquières, 75015 Paris</li>
              <li>Siret : 978537413 RCS Paris</li>
            </ul>
          ) : (
            <ul className="order-2 sm:order-3 -translate-y-20 lg:-translate-y-8">
              <li className="font-semibold flex items-center gap-2">
                <Image
                  src={FrenchFlag}
                  alt="French Flag"
                  width={30}
                  height={20}
                  className="w-[4rem] h-[2rem] mx-[-1rem]"
                />
                Parisian agency
              </li>
              <li>21 Rue du Clos Feuquières, 75015 Paris</li>
              <li>Siret : 978537413 RCS Paris</li>
              <li>Contact: (FR) +33 6 95 96 39 88 </li>
            </ul>
          )}
        </div>
      </div>
      <div className="max-w-7xl mx-auto block lg:hidden">
        <div className="flex items-center">
          <Image
            src={Logo}
            alt="Paris Class Logo"
            width={100}
            height={100}
            className="translate-x-[-24px] mr-auto ml-0"
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-6 mt-4">
          {locale === "ko" ? (
            <ul className="place-self-start">
              <li className="font-semibold flex items-center gap-2">
                <Image
                  src={KoreanFlag}
                  alt="Korean Flag"
                  width={512}
                  height={512}
                  className="w-[4rem] h-[2rem] mx-[-1rem]"
                />
                트래블 인 유어 포켓
              </li>
              <li>(주) 파리클래스 / 대표자 : 손한나</li>
              <li> 사업자 번호 887-86-03126</li>
              <li>주소 : 서울 특별시 중구 퇴계로 286, 6층 6063호</li>
              <li>연락처 : 010-8005-3936 (한국) +33 6 95 96 39 88 (파리)</li>
            </ul>
          ) : (
            <ul className="place-self-start">
              <li className="font-semibold flex items-center gap-2">
                <Image
                  src={KoreanFlag}
                  alt="Korean Flag"
                  width={512}
                  height={512}
                  className="w-[4rem] h-[2rem] mx-[-1rem]"
                />
                PARIS CLASS
              </li>
              <li>Luxury travel agency</li>
              <li>Certified Number # 887-86-03126</li>
              <li>
                Address : 286, Toegye-ro, Jung-gu, Seoul, Republic of Korea
              </li>
              <li>Contact : (KR) +82 10-8005-3936</li>
            </ul>
          )}
          <div className="flex flex-col items-start justify-center sm:place-self-end sm:self-start order-3 sm:order-2">
            <div className="flex items-start gap-4 pb-6">
              {/* Instagram */}
              <a
                href="https://instagram.com/travelinyourpocket_official"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="size-8 fill-white hover:fill-black duration-300 transition-colors"
                >
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                </svg>
              </a>
              {/* Facebook */}
              <a
                href="https://www.facebook.com/profile.php?id=61568543512653"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="size-8 fill-white hover:fill-black duration-300 transition-colors"
                >
                  <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64h98.2V334.2H109.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H255V480H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/travel-in-your-pocket"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="size-8 fill-white hover:fill-black duration-300 transition-colors"
                >
                  <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
                </svg>
              </a>
              {/* Twitter X */}
              <a
                href="https://x.com/parisclass_tip"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="size-8 fill-white hover:fill-black duration-300 transition-colors"
                >
                  <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                </svg>
              </a>
            </div>
            <div className="flex items-start justify-center flex-col text-sm">
              <div>통신판매업 신고 번호 : 2023-서울중구-1031</div>
              {locale === "ko" && (
                <>
                  <div>예금주 : (주) 파리클래스</div>
                  <div>하나은행 15591004663104</div>
                </>
              )}
              <div className="text-center text-xs mt-4">
                &copy; 2024 Paris Class. All rights reserved.
              </div>
            </div>
          </div>
          {locale === "ko" ? (
            <ul className="order-2 sm:order-3">
              <li className="font-semibold flex items-center gap-2">
                <Image
                  src={FrenchFlag}
                  alt="French Flag"
                  width={30}
                  height={20}
                  className="w-[4rem] h-[2rem] mx-[-1rem]"
                />
                Parisian agency
              </li>
              <li>21 Rue du Clos Feuquières, 75015 Paris</li>
              <li>Siret : 978537413 RCS Paris</li>
            </ul>
          ) : (
            <ul>
              <li className="font-semibold flex items-center gap-2">
                <Image
                  src={FrenchFlag}
                  alt="French Flag"
                  width={30}
                  height={20}
                  className="w-[4rem] h-[2rem] mx-[-1rem]"
                />
                Parisian agency
              </li>
              <li>21 Rue du Clos Feuquières, 75015 Paris</li>
              <li>Siret : 978537413 RCS Paris</li>
              <li>Contact: (FR) +33 6 95 96 39 88 </li>
            </ul>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
