"use client";
import { updateUserLevel } from "@/actions/update-user-level";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { userLevelObject } from "@/lib/parseUserLevel";
import type { UserLevel } from "@prisma/client";

const UpdateUserLevel = ({
  userLevel,
  userId,
}: {
  userLevel: UserLevel;
  userId: string;
}) => {
  const updateUser = async (newLevel: UserLevel) => {
    const response = await updateUserLevel({
      userId,
      newLevel,
    });
    if (response?.message) {
      return alert(response.message);
    }

    alert("User Updated");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{userLevelObject[userLevel]}</DropdownMenuTrigger>
      <DropdownMenuContent>
        {Object.entries(userLevelObject).map(([key, value]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => updateUser(key as UserLevel)}
          >
            {value}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UpdateUserLevel;
