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

export type TravelPlanArray = TravelPlan[];
