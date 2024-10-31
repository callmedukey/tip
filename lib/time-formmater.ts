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

export const formatDateToLocaleStringFromDB = (userDate: string) => {
  // return format(
  //   DateTime.fromISO(formatDateToUserLocalFromDB(userDate))!.toISO() as string,
  //   "MMM/d/yyyy"
  // );
};

export const formatDateToUTC = (userDate: Date): string => {
  return formatDateToUserLocal(userDate)
    .toUTC()
    .startOf("day")
    .toISO() as string;
};

export const dateToUTC = (userDate: Date) => {
  return formatDateToUserLocal(userDate).toUTC().toISO();
};

export const dateToLocal = (userDate: string) => {
  return formatDateToUserLocal(new Date(userDate)).toISO();
};
export const dateToLocalFormatted = (userDate: string) => {
  return format(
    formatDateToUserLocal(new Date(userDate)).toISO() as string,
    "yyyy/MM/dd HH:mm"
  );
};
export const dateToLocalFormattedWithoutTime = (userDate: string) => {
  return format(
    formatDateToUserLocal(new Date(userDate)).toISO() as string,
    "yyyy/MM/dd"
  );
};

export const formatDateToDestinationTimezone = (
  userDate: Date,
  destinationTimezone: string
) => {
  return DateTime.fromISO(userDate.toISOString())
    .setZone(destinationTimezone)
    .toISO() as string;
};
