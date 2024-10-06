import { UserLevel } from "@prisma/client";

export default function parseUserLevel(userLevel: UserLevel) {
  switch (userLevel) {
    case "tip_white":
      return "TIP White";
    case "tip_blue":
      return "TIP Blue";
    case "tip_black":
      return "TIP Black";
    case "tip_gold":
      return "TIP Gold";
  }
}
