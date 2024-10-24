"use client";

import Image from "next/image";
import DaySelectIcon from "@/public/select-day.png";
import { useQuery } from "@tanstack/react-query";

const TravelDetailAddress = ({
  selectedMarker,
}: {
  selectedMarker: { placeName: string; latitude: number; longitude: number };
}) => {
  const { data, isLoading } = useQuery<{
    results: { formatted_address: string }[];
  }>({
    queryKey: ["address", selectedMarker.placeName],
    queryFn: () =>
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${parseFloat(
          selectedMarker.latitude.toString()
        )},${parseFloat(selectedMarker.longitude.toString())}&key=${
          process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
        }`
      ).then((res) => res.json()),
  });

  return (
    <div className="bg-[#F1EFEC] w-full rounded-[2rem] p-6 flex gap-4 items-center">
      <a
        href={
          data
            ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                data.results[0].formatted_address
              )}`
            : ""
        }
        target="_blank"
      >
        <Image
          src={DaySelectIcon}
          width={348}
          height={320}
          placeholder="blur"
          quality={100}
          alt="Day select icon"
          className="max-w-[100px] w-full h-auto shrink-0 rounded-[1rem]"
        />
      </a>
      <p className="text-[1.875rem] font-medium text-[#404040] flex flex-col">
        <span>{selectedMarker?.placeName}</span>
        {isLoading && <span className="text-sm">Loading...</span>}
        {data && (
          <span
            className="text-sm"
            onClick={() => {
              if (!navigator || !data.results[0].formatted_address) return;
              navigator.clipboard.writeText(data.results[0].formatted_address);
              alert("Address copied to clipboard");
            }}
          >
            {data.results[0].formatted_address}
          </span>
        )}
      </p>
    </div>
  );
};

export default TravelDetailAddress;
