"use client";
import Logo from "@/public/logo.svg";
import Image from "next/image";
import MainPageForm from "../forms/MainPageForm";
import { useCallback, useState } from "react";
import SecondScreen from "./SecondScreen";
import ThirdScreen from "./ThirdScreen";
import FourthScreen from "./FourthScreen";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "usehooks-ts";

const FirstScreen = () => {
  const t = useTranslations("HomePage");

  const wrapperClassName =
    "min-h-[100rem] lg:min-h-[80rem] justify-center items-center flex";

  const [savedInitialData, setSavedInitialData] = useLocalStorage<Record<
    string,
    string | number | Date | any
  > | null>("initialData", null, {
    initializeWithValue: false,
  });

  const locale = useLocale();

  const [initialState, setInitialState] = useState<Record<
    string,
    string | number | Date
  > | null>(null);

  const [packageType, setPackageType] = useState<
    "all_inclusive" | "custom" | null
  >(null);

  const [optionsAndExtra, setOptionsAndExtra] = useState<{} | null>(null);

  const returnToFirstScreen = useCallback(() => {
    setPackageType(null);
    setInitialState(null);
    setSavedInitialData(null);
  }, []);

  const returnToSecondScreen = useCallback(() => {
    setPackageType(null);
  }, []);

  if (initialState && packageType && optionsAndExtra) {
    return (
      <div className={cn(wrapperClassName, "relative isolate min-h-[50rem]")}>
        <FourthScreen />
      </div>
    );
  }

  if (initialState && !packageType) {
    return (
      <div className={cn(wrapperClassName, "relative isolate")}>
        <SecondScreen
          setState={setPackageType}
          returnToFirstScreen={returnToFirstScreen}
        />
      </div>
    );
  }

  if (initialState && packageType) {
    return (
      <div className={cn(wrapperClassName, "relative isolate")}>
        <ThirdScreen
          setState={setOptionsAndExtra}
          packageType={packageType}
          initialState={initialState}
          returnToSecondScreen={returnToSecondScreen}
        />
      </div>
    );
  }

  return (
    <div className={cn(wrapperClassName, "relative isolate min-h-[60rem]")}>
      <div className="flex flex-col absolute top-16 mx-auto text-center lg:hidden">
        <Image
          src={Logo}
          alt="Mobile Logo"
          width={539}
          height={273}
          className={cn("h-auto w-[12rem] mx-auto")}
        />
        <h1
          className={cn(
            "text-center text-[1.25rem] mt-6 font-medium text-white font-garamond"
          )}
        >
          Travel in your Pocket <br /> for your best memories
        </h1>
      </div>

      <MainPageForm setState={setInitialState} />
      <Image
        priority
        alt="Logo"
        src={Logo}
        width={99}
        height={99}
        className="outline absolute size-[600px] -translate-y-[10rem] hidden lg:block pointer-events-none"
      />
      <h1 className="text-center text-[2.5rem] font-medium self-end mb-72 -translate-y-[10rem] text-white hidden lg:block">
        Travel In your Pocket <br />
        <span className="italic font-garamond font-medium">
          For your best and easy way
        </span>
        <br /> to make your own travel
      </h1>
    </div>
  );
};

export default FirstScreen;
7;
