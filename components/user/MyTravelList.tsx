"use client";

import { formatDateToUserLocal, getUserTimezone } from "@/lib/time-formmater";
import type { Request } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import MyTravelListItem from "./MyTravelListItem";

const MyTravelList = () => {
  const timezone = getUserTimezone();
  const todayUTC = useRef(formatDateToUserLocal(new Date()).toUTC().toISO());

  const { data, isLoading } = useQuery<Request[]>({
    queryKey: ["my-travel", timezone, todayUTC.current],
    queryFn: async () => {
      const res = await fetch(
        `/api/user/my-travel?tz=${timezone}&today=${todayUTC.current}`
      );
      return res.json();
    },
    enabled: !!timezone && !!todayUTC.current,
  });

  return (
    <ul className="divide-y-2 divide-accountGrayText">
      {isLoading && <MyTravelListItem isLoading={true} />}
      {data &&
        data.length > 0 &&
        data.map((request) => (
          <MyTravelListItem key={request.id} request={request} />
        ))}

      {data && data.length === 0 && <MyTravelListItem />}
    </ul>
  );
};

export default MyTravelList;
