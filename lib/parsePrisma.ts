import { JsonArray } from "@prisma/client/runtime/library";

export function parsePrisma<T>(json: JsonArray) {
  return JSON.parse(JSON.stringify(json)) as T;
}
