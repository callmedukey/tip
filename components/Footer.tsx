import { getLocale } from "next-intl/server";
import Image from "next/image";
import KoreanFlag from "@/public/south-korea.svg";
import FrenchFlag from "@/public/france.svg";

// —— 영어 사이트
// � PARIS CLASS

// 통신판매업 신고 번호 : 2023-서울중구-1031

const Footer = async () => {
  const locale = await getLocale();

  return (
    <footer className="bg-white/60 px-4 py-6 font-inter border-t border-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex md:flex-row flex-col flex-wrap justify-around gap-6">
          {locale === "ko" ? (
            <ul className="">
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
            <ul className="">
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

          {locale === "ko" ? (
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
        <div className="mt-12 flex items-center justify-center flex-col border-t pt-6 border-black text-sm">
          <div>통신판매업 신고 번호 : 2023-서울중구-1031</div>
          {locale === "ko" && (
            <>
              <div>예금주 : (주) 파리클래스</div>
              <div>하나은행 15591004663104</div>
            </>
          )}
        </div>
        <div className="text-center text-xs mt-12">
          Copyright 2024 Paris Class. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
