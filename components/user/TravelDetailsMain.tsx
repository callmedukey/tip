"use client";
import { GoogleMap, Marker } from "@react-google-maps/api";
import MyTravelPlane from "@/public/my-travel-plane.png";
import DaySelectIcon from "@/public/select-day.png";
import Image from "next/image";
import type { EditRequest, Request, Upload } from "@prisma/client";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  dateToLocalFormattedWithoutTime,
  formatDateToLocaleString,
  formatDateToUTC,
} from "@/lib/time-formmater";
import { JsonArray } from "@prisma/client/runtime/library";
import { parsePrisma } from "@/lib/parsePrisma";
import { TravelPlan } from "@/definitions/request-details";
import { cn } from "@/lib/utils";
import TravelDetailAddress from "@/app/[locale]/(after-auth)/my-travel/details/_components/TravelDetailAddress";
import TravelDetailsEditInput from "./TravelDetailsEditInput";
import { PenLine } from "lucide-react";
import { cancelTrip, confirmTrip } from "@/actions/user";
import { useRouter } from "@/i18n/routing";
import TravelDetailsDownloadButton from "./TravelDetailsDownloadButton";
import { useTranslations } from "next-intl";
import MyTravelPDF from "./MyTravelPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import TravelDetailsConfirmDialog from "./TravelDetailsConfirmDialog";
import TravelCancelDialog from "./TravelCancelDialog";

interface TravelDetailsMainProps extends Request {
  editRequests: EditRequest[];
  travelPlan: JsonArray;
  uploads: Upload[];
}

const TravelDetailsMain = ({
  request,
}: {
  request: TravelDetailsMainProps;
}) => {
  const router = useRouter();
  const mapRef = useRef<google.maps.Map | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<{
    longitude: number;
    latitude: number;
    placeName: string;
  } | null>(null);

  const t = useTranslations("MyTravelDetails");
  const ui = useTranslations("ui");
  const [openDialog, setOpenDialog] = useState(false);
  const [openCancelDialog, setCancelDialog] = useState(false);

  const travelPlanDays = useMemo(() => {
    if (!request.travelPlan) return [];
    const uniqueValues = new Set<string>();
    const days: string[] = [];
    request?.travelPlan.forEach((item: any) => {
      if (typeof item === "object" && item !== null && "day" in item) {
        days.push(item.day);
      }
    });
    days.forEach((day) => uniqueValues.add(day));
    return Array.from(uniqueValues);
  }, [request.travelPlan]);

  const markers = useMemo(() => {
    if (!request.travelPlan) return [];
    if (!selectedDay) return [];

    return request.travelPlan
      .filter((item: any) => item.day === selectedDay)
      .map((item: any) => ({
        latitude: parseFloat(item.latitude),
        longitude: parseFloat(item.longitude),
        placeName: item.placeName,
      }));
  }, [request.travelPlan, selectedDay]);

  const handleConfirmTrip = async () => {
    if (!confirm(t("confirm"))) return;
    setLoading(true);
    const res = await confirmTrip(request.id);
    if (res.message) {
      alert(res.message);
    }

    if (res.success) {
      setOpenDialog(true);
    }
    setLoading(false);
  };

  const handleCancelTrip = async () => {
    if (!confirm(t("cancelConfirm"))) return;
    setLoading(true);

    if (request.status === "canceled" && !request.canceled) {
      alert(t("canceledReview"));
      setLoading(false);
      return;
    }

    if (request.paid) {
      alert(t("alreadyPaid"));
    }
    const res = await cancelTrip(request.id, request.paid);
    if (res.message) alert(res.message);

    if (res.success) {
      alert(t("canceled"));
      router.replace("/my-travel");
    }
    setLoading(false);
  };

  const handleRevalidate = useCallback(() => {
    setTimeout(() => {
      router.refresh();
    }, 3000);
  }, [router]);

  return (
    <>
      <button
        type="button"
        className={cn("mt-8 text-white flex items-center gap-2")}
        onClick={() => {
          if (!selectedDay && !selectedMarker) {
            router.back();
            return;
          }

          setSelectedDay(null);
          setSelectedMarker(null);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
        {ui("back")}
      </button>
      <div className="grid lg:grid-cols-[auto_1fr] gap-4 mt-4 pb-60 lg:pb-12 min-h-[min(50vh,400px)]">
        <aside className="bg-[#F1EFEC] rounded-[2rem] overflow-clip relative max-h-[min(60vh,600px)] overflow-y-auto">
          <div className="py-4 bg-egyptianBlue px-8 flex items-center text-white sm:gap-8 gap-4 sticky top-0">
            <Image
              src={MyTravelPlane}
              width={712}
              height={656}
              placeholder="blur"
              quality={100}
              alt="My travel plane"
              className="max-w-[80px] w-full h-auto shrink-0 rounded-[1rem]"
            />
            <p>
              {selectedDay ? (
                <div className="flex flex-col">
                  <span className="font-bold">
                    {formatDateToLocaleString(
                      parsePrisma<TravelPlan[]>(request.travelPlan)?.find(
                        (item) => item.day === selectedDay
                      )?.date as Date
                    )}
                  </span>
                  <span className="text-[1.1rem] text-white/65">
                    {selectedDay}
                  </span>
                </div>
              ) : (
                `${formatDateToLocaleString(
                  formatDateToUTC(request.from) as unknown as Date
                )} - ${formatDateToLocaleString(
                  formatDateToUTC(request.to) as unknown as Date
                )}`
              )}
            </p>
          </div>
          {!selectedDay && (
            <ul className="py-4 space-y-4 max-w-[25rem] w-full">
              {Array.isArray(travelPlanDays) &&
                travelPlanDays.length > 0 &&
                travelPlanDays.map((day) => (
                  <li
                    key={day}
                    className={cn(
                      "flex items-center gap-4 px-6 hover:opacity-50 cursor-pointer transition-opacity duration-300 font-medium py-2 max-w-[95%] w-full mx-auto rounded-md",
                      dateToLocalFormattedWithoutTime(
                        (
                          parsePrisma<TravelPlan[]>(request.travelPlan)?.find(
                            (item) => item.day === day
                          )?.date as Date
                        ).toString()
                      ) ===
                        dateToLocalFormattedWithoutTime(new Date().toString())
                        ? "bg-yellow-300/20 ring-2 ring-yellow-300"
                        : ""
                    )}
                    onClick={() => {
                      setSelectedDay(day);
                      setSelectedMarker({
                        longitude: parseFloat(
                          parsePrisma<TravelPlan[]>(request.travelPlan)?.find(
                            (item) => item.day === day
                          )?.longitude as string
                        ),
                        latitude: parseFloat(
                          parsePrisma<TravelPlan[]>(request.travelPlan)?.find(
                            (item) => item.day === day
                          )?.latitude as string
                        ),
                        placeName: parsePrisma<TravelPlan[]>(
                          request.travelPlan
                        )?.find((item) => item.day === day)
                          ?.placeName as string,
                      });
                    }}
                  >
                    <Image
                      src={DaySelectIcon}
                      width={348}
                      height={320}
                      placeholder="blur"
                      quality={100}
                      alt="Day select icon"
                      className="max-w-[80px] w-full h-auto shrink-0 rounded-[1rem]"
                    />
                    <div className="flex flex-col">
                      <span className="text-accountGrayText">
                        {formatDateToLocaleString(
                          parsePrisma<TravelPlan[]>(request.travelPlan)?.find(
                            (item) => item.day === day
                          )?.date as Date
                        )}
                      </span>
                      <span className="text-[1.25rem] text-murrey">{day}</span>
                    </div>
                  </li>
                ))}
            </ul>
          )}
          {selectedDay && (
            <ul className="py-4 space-y-4 max-w-[25rem] w-full px-2 overflow-y-auto">
              {Array.isArray(travelPlanDays) &&
                travelPlanDays.length > 0 &&
                parsePrisma<TravelPlan[]>(request.travelPlan)
                  ?.filter((item) => item.day === selectedDay)
                  .map((day, index) => (
                    <li
                      key={day.day + index}
                      className={cn(
                        "flex items-center gap-4 px-8 hover:opacity-50 cursor-pointer transition-opacity duration-300 font-medium py-2 rounded-md",
                        day.placeName === selectedMarker?.placeName &&
                          "ring-2 ring-egyptianBlue/60 bg-egyptianBlue/10"
                      )}
                      onClick={() =>
                        setSelectedMarker({
                          longitude: parseFloat(day.longitude),
                          latitude: parseFloat(day.latitude),
                          placeName: day.placeName,
                        })
                      }
                    >
                      <Image
                        src={DaySelectIcon}
                        width={348}
                        height={320}
                        placeholder="blur"
                        quality={100}
                        alt="Day select icon"
                        className="max-w-[80px] w-full h-auto shrink-0 rounded-[1rem]"
                      />
                      <div className="flex flex-col">
                        <span className="text-[1.25rem] text-murrey">
                          {day.placeName}
                        </span>
                        <span className="text-accountGrayText">{day.time}</span>
                      </div>
                    </li>
                  ))}
            </ul>
          )}
        </aside>
        <section className="w-full space-y-4 h-full">
          {selectedMarker && (
            <TravelDetailAddress selectedMarker={selectedMarker} />
          )}

          <div
            className={cn(
              "bg-[#F1EFEC] w-full rounded-[2rem] relative h-full font-inter isolate min-h-[400px]",
              selectedMarker && " bg-transparent"
            )}
          >
            {!selectedMarker && (
              <div className="p-8">
                <h1 className="flex items-center gap-4 text-[1.875rem] font-medium lg:mb-24 mb-12 justify-between">
                  <span className="flex items-center gap-4">
                    <Image
                      src={MyTravelPlane}
                      width={712}
                      height={656}
                      placeholder="blur"
                      quality={100}
                      alt="My travel plane"
                      className="max-w-[100px] w-full h-auto shrink-0 rounded-[1rem]"
                    />
                    {t("tripDetails")}
                  </span>
                  {request.paid ||
                  request.confirmed ||
                  request.status === "confirmed" ? (
                    <PDFDownloadLink
                      document={<MyTravelPDF request={request} />}
                    >
                      <span className="text-sm">{t("downloadAsPDF")}</span>
                    </PDFDownloadLink>
                  ) : null}
                </h1>
                <div className="grid grid-cols-2 gap-x-2 gap-y-6 min-w-full sm:min-w-[15rem] mb-12">
                  {request.summary &&
                    Array.isArray(request.summary) &&
                    request.summary.map((item: any, index) => (
                      <div
                        key={index + item.label}
                        className="flex flex-col gap-2"
                      >
                        <span className="text-formText text-[1.25rem] font-medium">
                          {item.label}
                        </span>
                        <span className="text-accountGrayText text-[1rem] font-normal">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  {request.uploads && request.uploads.length > 0 && (
                    <div className="col-span-full">
                      <h2 className="text-[1.25rem] font-medium border-b border-black/40">
                        {t("downloads")}
                      </h2>
                      <div>
                        {request.uploads.map((upload) => (
                          <div
                            key={upload.id}
                            className="flex items-center justify-between gap-2 border-b border-accountGrayText py-2"
                          >
                            <span className="max-w-[15rem] text-wrap break-words">
                              {upload.title}
                            </span>
                            <TravelDetailsDownloadButton upload={upload} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-start justify-between gap-4 flex-col lg:flex-row">
                  {request.adminNotes && (
                    <div className="bg-[#E5E5E5]  rounded-[2rem] flex flex-col items-center justify-center p-4 mb-6 basis-1/2 flex-grow w-full">
                      <h2 className="text-[1.25rem] font-medium border-b border-black/40">
                        {t("adminNotes")}
                      </h2>
                      <div className="text-black whitespace-pre-wrap w-full mt-2 font-pretendard">
                        {request.adminNotes}
                      </div>
                    </div>
                  )}
                  <div className="flex-grow w-full lg:basis-1/2">
                    <div className="space-y-4">
                      {request.editRequests?.map((editRequest) => (
                        <div
                          key={editRequest.id}
                          className="bg-[#E5E5E5]  rounded-[2rem] flex flex-col items-center justify-center p-4 lg:mt-0 mt-8"
                        >
                          <div className="rounded-[1rem] py-4 px-2 w-full flex flex-col gap-4 items-center justify-center lg:block min-h-fit">
                            <PenLine className="size-6 mx-auto" />
                            <div className="mt-4">{editRequest.content}</div>
                          </div>
                        </div>
                      ))}
                      {!request.paid && (
                        <TravelDetailsEditInput requestId={request.id} />
                      )}
                      {request.status !== "confirmed" && !request.paid && (
                        <div className="flex justify-end !mt-8 gap-2">
                          <button
                            className="p-4 rounded-full bg-egyptianBlue text-white flex-1"
                            type="button"
                            onClick={handleConfirmTrip}
                            disabled={loading}
                          >
                            {t("ilike")}
                          </button>
                          <button
                            className="p-4 rounded-full bg-white border border-black text-black flex-1"
                            type="button"
                            onClick={handleCancelTrip}
                            disabled={loading}
                          >
                            {t("cancel")}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedMarker && (
              <GoogleMap
                mapContainerStyle={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "1rem",
                  maxHeight: "400px",
                }}
                center={{
                  lat: selectedMarker?.latitude,
                  lng: selectedMarker?.longitude,
                }}
                zoom={14}
                onLoad={(map) => {
                  mapRef.current = map;
                }}
              >
                {markers.map((marker, index) => (
                  <Marker
                    key={index + marker.longitude}
                    position={{ lat: marker.latitude, lng: marker.longitude }}
                    onClick={() => setSelectedMarker(marker)}
                    label={(index + 1).toString()}
                    animation={
                      marker.placeName === selectedMarker?.placeName
                        ? google.maps.Animation.BOUNCE
                        : undefined
                    }
                  />
                ))}
              </GoogleMap>
            )}
          </div>
        </section>
      </div>
      <TravelDetailsConfirmDialog open={openDialog} setOpen={setOpenDialog} />
      <TravelCancelDialog
        open={openCancelDialog}
        setOpen={setCancelDialog}
        request={request}
        handleRevalidate={handleRevalidate}
      />
    </>
  );
};

export default TravelDetailsMain;
