"use client";
import { updateAccountType } from "@/actions/admin";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { AccountType } from "@prisma/client";

const UpdateAccountType = ({
  accountType,
  userId,
}: {
  accountType: AccountType;
  userId: string;
}) => {
  const updateAccount = async (newAccountType: AccountType) => {
    const response = await updateAccountType({
      userId,
      newAccountType,
    });
    if (response?.message) {
      return alert(response.message);
    }

    if (newAccountType === "Admin") {
      alert("User must logout and login again to gain admin access");
    }

    alert("User Updated");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Update Account Type</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => updateAccount("Business")}>
          Business
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => updateAccount("Leisure")}>
          Leisure
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => updateAccount("Admin")}>
          Admin
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UpdateAccountType;
