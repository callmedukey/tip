"use client";

import { Link } from "@/i18n/routing";

const FourthScreen = () => {
  return (
    <div className="lg:h-[45rem] h-[30rem] w-full max-w-7xl bg-white/95 rounded-2xl flex items-center justify-center flex-col gap-8 text-formText mb-auto mt-44 mx-4 px-4 text-center lg:text-left">
      <h1 className="font-bold text-[1.875rem]">Thank you</h1>
      <p className="text-base sm:text-[1.5rem] sm:font-normal font-medium">
        Our itinerary coordinator <br className="sm:hidden" /> will get back to
        you within <br className="sm:hidden" />
        <span className="text-egyptianBlue">24hours</span>
      </p>
      <p className="text-[0.75rem] sm:text-[1rem]">
        Go to My Travel to check your itinerary and invoice
      </p>
      <Link
        href="/my-travel"
        className="px-16 py-4 bg-egyptianBlue text-white rounded-full font-normal mt-12 w-full text-center max-w-xs mx-auto"
      >
        Done
      </Link>
    </div>
  );
};

export default FourthScreen;
