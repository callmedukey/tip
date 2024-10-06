import { format } from "date-fns";
import { DateTime } from "luxon";

export const getUserTimezone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

export const formatDateToUserLocal = (userDate: Date) => {
  return DateTime.fromISO(userDate.toISOString(), { zone: getUserTimezone() });
};

export const formatDateToUserLocalFromDB = (userDate: string) => {
  return DateTime.fromISO(userDate).toUTC().toISO();
};

export const formatDateToUserLocalFromDBWithTZ = (
  userDate: string,
  timezone: string
) => {
  return DateTime.fromISO(userDate, { zone: timezone }).toISO();
};

export const formatDateToKR = (userDate: Date) => {
  return format(userDate, "yyyy/MM/dd");
};

export const formatDateToLocaleString = (userDate: Date) => {
  return format(userDate, "MMM/d/yyyy");
};

export const formatDateToUTC = (userDate: Date): string => {
  return formatDateToUserLocal(userDate)
    .toUTC()
    .startOf("day")
    .toISO() as string;
};

export const formatDateToDestinationTimezone = (
  userDate: Date,
  destinationTimezone: string
) => {
  return DateTime.fromISO(userDate.toISOString())
    .setZone(destinationTimezone)
    .toISO() as string;
};
