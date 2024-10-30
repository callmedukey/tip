"use client";

import Image from "next/image";
import Paris from "@/public/paris.png";
import StretchedParis from "@/public/stretched-paris.png";
import StretchedGreece from "@/public/stretched-greece.png";
import Greece from "@/public/greece.png";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "@/i18n/routing";

const SecondScreen = ({
  setState,
  returnToFirstScreen,
}: {
  setState: (state: "all_inclusive" | "custom") => void;
  returnToFirstScreen: () => void;
}) => {
  const [session] = useAuth();
  const router = useRouter();
  const handleClick = (string: "all_inclusive" | "custom") => {
    setState(string);
  };

  const handleReturnToFirstScreen = () => {
    returnToFirstScreen();
  };

  return (
    <>
      <Button
        className="absolute lg:hidden top-[calc(var(--header-height)+6.5rem)] left-4 z-20 bg-transparent text-white text-[0.75rem] shadow-none gap-2 flex items-center hover:bg-transparent hover:opacity-80"
        type="button"
        onClick={handleReturnToFirstScreen}
      >
        <ArrowLeft strokeWidth={1} />
        Back
      </Button>
      <div className="flex items-center flex-col justify-center max-w-screen-8xl mx-auto w-full">
        <div className="flex items-center justify-center lg:flex-row flex-col max-w-screen-8xl mx-auto w-full text-white gap-4 lg:mt-6 mt-24 px-4 pb-4 pt-4 lg:py-0 self-start lg:self-center">
          <div className="flex flex-col lg:block items-end justify-end relative basis-full lg:basis-1/2 flex-1 shrink-0 min-h-[45rem] xl:min-h-[calc(100vh-var(--header-height)-20rem)] isolate w-full lg:rounded-none rounded-[3rem] overflow-clip">
            <Image
              className="object-cover object-left hidden lg:block"
              placeholder="blur"
              src={Paris}
              fill
              quality={100}
              alt="Paris"
              priority
            />
            <Image
              className="object-cover object-center lg:object-left block lg:hidden w-full h-[20rem] rounded-t-[3rem]"
              placeholder="blur"
              src={StretchedParis}
              width={700}
              height={760}
              quality={100}
              alt="Paris"
              priority
            />
            <div className="lg:absolute z-10 py-24 rounded-[3rem] lg:rounded-none lg:top-0 lg:right-0 lg:max-w-[45%] -mt-16 lg:mt-0 w-full h-full bg-[#88003F] lg:bg-[#88003F]/80 flex flex-col gap-4 items-center justify-center text-center">
              <h2 className="font-bold text-[1.25rem]/[100%]">
                All inclusive package
              </h2>
              <p className="lg:max-w-[14rem] max-w-sm">
                We plan everything from airport pick up, hotel reservations, to
                activities.
              </p>
              <Button
                className="bg-white text-[#88003F] rounded-full px-16 lg:px-8 mt-12 mb-0 z-20 text-[0.75rem] hover:bg-white/90 lg:font-normal font-medium"
                type="button"
                onClick={() => {
                  if (!session) {
                    router.push("/login");
                  } else {
                    handleClick("all_inclusive");
                  }
                }}
              >
                Book Now
              </Button>
            </div>
          </div>
          <div className="flex flex-col lg:block items-end justify-end relative basis-full -mt-16 lg:mt-0 lg:basis-1/2 flex-1 shrink-0 min-h-[45rem] xl:min-h-[calc(100vh-var(--header-height)-20rem)] isolate w-full lg:rounded-none rounded-[3rem] overflow-clip">
            <Image
              className="object-cover object-left hidden lg:block"
              placeholder="blur"
              src={Greece}
              fill
              quality={100}
              alt="Paris"
              priority
            />
            <Image
              className="object-cover object-center lg:object-left block lg:hidden w-full h-[20rem] rounded-t-[3rem]"
              placeholder="blur"
              src={StretchedGreece}
              width={700}
              height={760}
              quality={100}
              alt="Paris"
              priority
            />
            <div className="lg:absolute z-10 py-24 rounded-[3rem] lg:rounded-none lg:top-0 lg:right-0 lg:max-w-[45%] -mt-16 lg:mt-0 w-full h-full bg-[#036DBA] lg:bg-[#036DBA]/80 flex flex-col gap-4 items-center justify-center text-center">
              <h2 className="font-bold text-[1.25rem]/[100%]">
                Custom package
              </h2>
              <p className="lg:max-w-[14rem] max-w-sm">
                You create and we assist planning a package based on your
                specific needs
              </p>
              <Button
                className="bg-white text-[#036DBA] rounded-full px-16 lg:px-8 mt-12 mb-0 z-20 text-[0.75rem] hover:bg-white/90"
                type="button"
                onClick={() => {
                  if (!session) {
                    router.push("/login");
                  } else {
                    handleClick("custom");
                  }
                }}
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SecondScreen;
