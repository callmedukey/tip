"use client";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import MyTravelPlane from "@/public/my-travel-plane.png";
import DaySelectIcon from "@/public/select-day.png";
import Image from "next/image";
import type { EditRequest, Request } from "@prisma/client";
import { useMemo, useRef, useState } from "react";
import {
  formatDateToLocaleString,
  formatDateToUTC,
} from "@/lib/time-formmater";
import { JsonArray } from "@prisma/client/runtime/library";
import { parsePrisma } from "@/lib/parsePrisma";
import { TravelPlan } from "@/definitions/request-details";
import { cn } from "@/lib/utils";
import TravelDetailAddress from "@/app/[locale]/(after-auth)/my-travel/details/_components/TravelDetailAddress";

interface TravelDetailsMainProps extends Request {
  editRequests: EditRequest[];
  travelPlan: JsonArray;
}

const TravelDetailsMain = ({
  request,
}: {
  request: TravelDetailsMainProps;
}) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<{
    longitude: number;
    latitude: number;
    placeName: string;
  } | null>(null);

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

  return (
    <>
      <button
        type="button"
        className={cn(
          "mt-16 text-white flex items-center gap-2",
          !selectedDay && "invisible"
        )}
        onClick={() => {
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
        Back
      </button>
      <div className="grid grid-cols-[auto_1fr] gap-4 mt-4">
        <aside className="bg-[#F1EFEC] rounded-[2rem] overflow-clip relative max-h-[min(60vh,600px)] overflow-y-auto">
          <div className="py-4 bg-egyptianBlue px-8 flex items-center text-white gap-8 sticky top-0">
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
              {`${formatDateToLocaleString(
                formatDateToUTC(request.from) as unknown as Date
              )} - ${formatDateToLocaleString(
                formatDateToUTC(request.to) as unknown as Date
              )}`}
            </p>
          </div>
          {!selectedDay && (
            <ul className="py-4 space-y-4 max-w-[25rem] w-full">
              {Array.isArray(travelPlanDays) &&
                travelPlanDays.length > 0 &&
                travelPlanDays.map((day) => (
                  <li
                    key={day}
                    className="flex items-center gap-4 px-8 hover:opacity-50 cursor-pointer transition-opacity duration-300 font-medium"
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
            <ul className="py-4 space-y-4 max-w-[25rem] w-full">
              {Array.isArray(travelPlanDays) &&
                travelPlanDays.length > 0 &&
                parsePrisma<TravelPlan[]>(request.travelPlan)
                  ?.filter((item) => item.day === selectedDay)
                  .map((day, index) => (
                    <li
                      key={day.day + index}
                      className="flex items-center gap-4 px-8 hover:opacity-50 cursor-pointer transition-opacity duration-300 font-medium"
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
        <section className="w-full px-4 space-y-4">
          {selectedMarker && (
            <TravelDetailAddress selectedMarker={selectedMarker} />
          )}

          <div className="bg-[#F1EFEC] w-full rounded-[2rem] relative h-full min-h-[min(50vh,500px)] max-h-[20rem]">
            {selectedMarker && (
              <GoogleMap
                mapContainerStyle={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "1rem",
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
                  />
                ))}
              </GoogleMap>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default TravelDetailsMain;
