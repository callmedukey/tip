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

export type RequestStatus = "pending" | "initialEditing" | "confirmed" | "invoiced" | "paid";

export const requestStatusObject = {
  pending: "under review",
  initialEditing: "initial editing",
  confirmed: "confirmed",
  invoiced: "invoiced",
  paid: "paid",
};

export type TravelPlanArray = TravelPlan[];
