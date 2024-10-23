import parseUserLevel from "@/lib/user-level";
import { cn } from "@/lib/utils";
import type { UserLevel } from "@prisma/client";

const BadgeContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "rounded-full px-6 flex items-center justify-center py-1 font-medium",
        className
      )}
    >
      {children}
    </div>
  );
};

const UserBadge = ({
  userLevel,
  className,
}: {
  userLevel: UserLevel | null;
  className?: string;
}) => {
  const white = "bg-white text-[#A3A3A3]";
  const blue = "bg-[#1564EC] text-white";
  const black = "bg-[#000000] text-white";
  const gold = "bg-[#FFD700] text-black";

  switch (userLevel) {
    case "tip_white":
      return (
        <BadgeContainer className={cn(white, className)}>
          {parseUserLevel(userLevel)}
        </BadgeContainer>
      );
    case "tip_blue":
      return (
        <BadgeContainer className={cn(blue, className)}>
          {parseUserLevel(userLevel)}
        </BadgeContainer>
      );
    case "tip_black":
      return (
        <BadgeContainer className={cn(black, className)}>
          {parseUserLevel(userLevel)}
        </BadgeContainer>
      );
    case "tip_gold":
      return (
        <BadgeContainer className={cn(gold, className)}>
          {parseUserLevel(userLevel)}
        </BadgeContainer>
      );

    default:
      return null;
  }
};

export default UserBadge;
