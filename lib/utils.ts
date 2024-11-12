import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://cms.travelinyourpocket.com"
    : "http://localhost:4000";
