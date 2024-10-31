import type { RequestStatus } from "@prisma/client";

export type Summary = {
  label: string;
  value: string;
};

export type SummaryArray = Summary[];

export type TravelPlan = {
  date: Date;
  day: string;
  time: string;
  placeName: string;
  longitude: string;
  latitude: string;
};


export const requestStatusObject: Record<RequestStatus, string> = {
  pending: "New",
  editing: "Urgent Edit",
  awaitingResponse: "Awaiting Response",
  confirmed: "Confirmed",
  invoiced: "Invoiced",
  paid: "Paid",
  initialEditing: "Pre-Payment Edit",
  canceled: "Canceled"
};
export const requestStatusObjectKR: Record<RequestStatus, string> = {
  pending: "신규",
  editing: "긴급 수정",
  awaitingResponse: "대기",
  confirmed: "승인",
  invoiced: "결제대기",
  paid: "결제완료",
  initialEditing: "결제 전 수정",
  canceled: "취소"
};


export type TravelPlanArray = TravelPlan[];
