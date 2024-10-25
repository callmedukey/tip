import Image from "next/image";
import MyTravelPlane from "@/public/my-travel-plane.png";
import { Link } from "@/i18n/routing";
import type { Request } from "@prisma/client";
import {
  formatDateToLocaleString,
  formatDateToUserLocalFromDB,
} from "@/lib/time-formmater";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
import MyTravelListFinalRequestChangeBox from "./MyTravelListFinalRequestChangeBox";
import QuoteInvoiceModal from "../modals/QuoteInvoiceModal";
import MyTravelListItemShareButton from "./MyTravelListItemShareButton";

const MyTravelListItem = ({
  request,
  isLoading = false,
}: {
  request?: Request;
  isLoading?: boolean;
}) => {
  if (isLoading)
    return (
      <li className="grid lg:grid-rows-[6rem,auto,6rem] grid-rows-[repeat(3,auto)] py-4">
        <Image
          src={MyTravelPlane}
          width={712}
          height={656}
          quality={100}
          alt="My travel plane"
          className="max-w-[6rem] w-full h-auto flex-1 shrink-0 lg:hidden absolute left-1/2 -translate-x-1/2 -top-12 rounded-[2rem] bg-white"
        />
        <div className="flex lg:flex-row flex-col items-center text-center lg:text-left lg:justify-between lg:items-start lg:gap-0 gap-3 mb-6">
          <h2 className="text-formText lg:text-accountGrayText text-base lg:text-[1.5rem] lg:font-medium">
            My travel
          </h2>
        </div>
        <div className="flex items-start lg:items-center gap-12 lg:flex-row flex-col mt-24 lg:mt-0">
          <Image
            src={MyTravelPlane}
            width={712}
            height={656}
            quality={100}
            alt="My travel plane"
            className="max-w-[178px] w-full h-auto flex-1 shrink-0 lg:block hidden"
          />
          <div className="flex flex-col gap-2 flex-1 lg:items-end w-full">
            <p className="text-formText text-base lg:text-[1.25rem] font-medium">
              Destination
            </p>
            <Skeleton className="w-full  h-[2rem]" />
          </div>
          <div className="flex flex-col gap-2 flex-1 lg:items-end w-full">
            <p className="text-formText text-base lg:text-[1.25rem] font-medium">
              Date
            </p>
            <Skeleton className="w-full h-[2rem]" />
          </div>
          <div className="flex flex-col gap-2 flex-1 lg:items-end w-full">
            <p className="text-formText text-base lg:text-[1.25rem] font-medium">
              Persons
            </p>
            <Skeleton className="w-full  h-[2rem]" />
          </div>
          <div className="flex flex-col gap-2 flex-1 lg:items-end w-full">
            <p className="text-formText text-base lg:text-[1.25rem] font-medium">
              Purpose
            </p>
            <Skeleton className="w-full h-[2rem]" />
          </div>
        </div>
      </li>
    );
  if (request)
    return (
      <li
        className={cn(
          "grid  py-4",
          request.paid
            ? "lg:grid-rows-[6rem,auto,6rem, 8rem] grid-rows-[repeat(4,auto)] lg:grid-cols-[auto,minmax(15rem,0.5fr)] gap-x-6"
            : ""
        )}
      >
        <Image
          src={MyTravelPlane}
          width={712}
          height={656}
          quality={100}
          alt="My travel plane"
          className="max-w-[6rem] w-full h-auto flex-1 shrink-0 lg:hidden absolute left-1/2 -translate-x-1/2 -top-12 rounded-[2rem] bg-white"
        />
        <div className="lg:grid-rows-[6rem,auto,6rem] grid-rows-[repeat(3,auto)]">
          <div className="flex lg:flex-row flex-col items-center text-center lg:text-left lg:justify-between lg:items-start lg:gap-0 gap-3">
            <h2 className="text-formText lg:text-accountGrayText text-base lg:text-[1.5rem] lg:font-medium mb-6">
              My travel
            </h2>

            {request.status !== "pending" ? (
              <Link
                href={`/my-travel/details?id=${request.id}`}
                className="flex items-center lg:gap-2 gap-3 lg:no-underline underline underline-offset-4 lg:text-accountGrayText text-egyptianBlue lg:text-[1.5rem] font-medium"
              >
                Details
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4 lg:size-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            ) : null}
          </div>
          <div className="flex items-start lg:items-center gap-4 lg:gap-4 lg:flex-row flex-col mt-24 lg:mt-0">
            <Image
              src={MyTravelPlane}
              width={712}
              height={656}
              quality={100}
              alt="My travel plane"
              className="max-w-[6rem] xl:max-w-[10rem] w-full h-auto flex-1 shrink-0 lg:block hidden"
            />
            <div className="flex flex-col gap-2 flex-1 ">
              <p className="text-formText text-base lg:text-[1.25rem] font-medium">
                Destination
              </p>
              <p className="text-[0.75rem] lg:text-base text-accountGrayText">
                {request.city.join(", ")}
              </p>
            </div>
            <div className="flex flex-col gap-2 flex-1 lg:items-end shrink-0">
              <p className="text-formText text-base lg:text-[1.25rem] font-medium mr-auto">
                Date
              </p>
              <p className="text-[0.75rem] lg:text-base text-accountGrayText mr-auto whitespace-nowrap">
                {formatDateToLocaleString(
                  formatDateToUserLocalFromDB(
                    request.from as unknown as string
                  ) as unknown as Date
                )}{" "}
                -{" "}
                {formatDateToLocaleString(
                  formatDateToUserLocalFromDB(
                    request.to as unknown as string
                  ) as unknown as Date
                )}
              </p>
            </div>
            <div className="flex flex-col gap-2 flex-1 lg:items-end">
              <p className="text-formText text-base lg:text-[1.25rem] font-medium">
                Persons
              </p>
              <p className="text-[0.75rem] lg:text-base text-accountGrayText whitespace-nowrap">{`Adults: ${request.adults} Infants: ${request.infants}`}</p>
            </div>
            <div className="flex flex-col gap-2 flex-1 lg:items-end">
              <p className="text-formText text-base lg:text-[1.25rem] font-medium">
                Purpose
              </p>
              <p className="text-[0.75rem] lg:text-base text-accountGrayText capitalize">
                {request.purpose}
              </p>
            </div>
          </div>
          <div className="items-center justify-end lg:gap-8 lg:flex-row flex-col lg:mt-0 mt-16 gap-6 hidden lg:flex">
            <MyTravelListItemShareButton
              requestId={request.id.toString()}
              sharedLink={request.sharedLink}
            />
            {request.price &&
            request.price > 0 &&
            request.currency &&
            request.quoteLink ? (
              <QuoteInvoiceModal
                price={request.price}
                currency={request.currency}
                paid={request.paid}
                invoiceUrl={request.quoteLink}
              >
                <button className="bg-egyptianBlue text-white max-w-xs w-full lg:w-[15rem] py-4 rounded-full font-medium">
                  See quote
                </button>
              </QuoteInvoiceModal>
            ) : null}
            <button className="bg-transparent text-cancel border border-cancel max-w-xs w-full lg:w-[15rem] py-4 rounded-full font-medium">
              Cancel
            </button>
          </div>
        </div>

        {request.paid && (
          <>
            <MyTravelListFinalRequestChangeBox requestId={request.id} />
            <div className="flex items-center justify-end lg:gap-8 lg:flex-row flex-col lg:mt-0 mt-16 gap-6 lg:hidden">
              <MyTravelListItemShareButton
                requestId={request.id.toString()}
                sharedLink={request.sharedLink}
              />
              {request.price &&
              request.price > 0 &&
              request.currency &&
              request.quoteLink ? (
                <QuoteInvoiceModal
                  price={request.price}
                  currency={request.currency}
                  paid={request.paid}
                  invoiceUrl={request.quoteLink}
                >
                  <button className="bg-egyptianBlue text-white max-w-xs w-full lg:w-[15rem] py-4 rounded-full font-medium">
                    See quote
                  </button>
                </QuoteInvoiceModal>
              ) : null}
              <button className="bg-transparent text-cancel border border-cancel max-w-xs w-full lg:w-[15rem] py-4 rounded-full font-medium">
                Cancel
              </button>
            </div>
          </>
        )}
        {!request.paid && (
          <>
            <div className="flex items-center justify-end lg:gap-8 lg:flex-row flex-col lg:mt-0 mt-16 gap-6 lg:hidden">
              <MyTravelListItemShareButton
                requestId={request.id.toString()}
                sharedLink={request.sharedLink}
              />
              {request.price &&
              request.price > 0 &&
              request.currency &&
              request.quoteLink ? (
                <QuoteInvoiceModal
                  price={request.price}
                  currency={request.currency}
                  paid={request.paid}
                  invoiceUrl={request.quoteLink}
                >
                  <button className="bg-egyptianBlue text-white max-w-xs w-full lg:w-[15rem] py-4 rounded-full font-medium">
                    See quote
                  </button>
                </QuoteInvoiceModal>
              ) : null}

              <button className="bg-transparent text-cancel border border-cancel max-w-xs w-full lg:w-[15rem] py-4 rounded-full font-medium">
                Cancel
              </button>
            </div>
          </>
        )}
      </li>
    );

  return (
    <li className="grid lg:grid-rows-[6rem,auto,6rem] grid-rows-[repeat(3,auto)] py-4">
      <Image
        src={MyTravelPlane}
        width={712}
        height={656}
        quality={100}
        alt="My travel plane"
        className="max-w-[6rem] w-full h-auto flex-1 shrink-0 lg:hidden absolute left-1/2 -translate-x-1/2 -top-12 rounded-[2rem] bg-white"
      />
      <div className="flex lg:flex-row flex-col items-center text-center lg:text-left lg:justify-between lg:items-start lg:gap-0 gap-3">
        <h2 className="text-formText lg:text-accountGrayText text-base lg:text-[1.5rem] lg:font-medium mb-6">
          My travel
        </h2>
      </div>
      <div className="flex items-start lg:items-center gap-12 lg:flex-row flex-col mt-24 lg:mt-0">
        <Image
          src={MyTravelPlane}
          width={712}
          height={656}
          quality={100}
          alt="My travel plane"
          className="max-w-[178px] w-full h-auto flex-1 shrink-0 lg:block hidden"
        />
        <div className="w-full text-accountGrayText">
          You have no active travel requests
        </div>
      </div>
      <div className="flex items-center justify-end lg:gap-8 lg:flex-row flex-col lg:mt-0 mt-16 gap-6">
        <Link
          href="/"
          className="bg-egyptianBlue text-white max-w-xs w-full lg:w-[15rem] py-4 rounded-full font-medium flex items-center justify-center"
        >
          Book now
        </Link>
      </div>
    </li>
  );
};

export default MyTravelListItem;
