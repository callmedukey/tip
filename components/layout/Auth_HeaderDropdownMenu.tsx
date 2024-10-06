"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Link, useRouter } from "@/i18n/routing";
import { logout } from "@/actions/auth";
import { useAuth } from "../context/AuthContext";

const Auth_HeaderDropdownMenu = () => {
  const [session, setSession, logoutSession] = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    logoutSession();
    router.replace("/");
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="focus:outline-none flex gap-2 items-center leading-none lg:text-base text-[0.75rem]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path
            fillRule="evenodd"
            d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
            clipRule="evenodd"
          />
        </svg>
        My <br className="lg:hidden" /> Account
      </DropdownMenuTrigger>
      <DropdownMenuContent className="text-center">
        <DropdownMenuItem asChild>
          <Link href="/my-travel" className="block">
            My travel
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/my-profile" className="block">
            My profile
          </Link>
        </DropdownMenuItem>
        {session?.accountType === "Admin" && (
          <DropdownMenuItem asChild>
            <Link href="/admin" className="block">
              Admin
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild>
          <button className="block w-full" onClick={handleLogout}>
            Log out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Auth_HeaderDropdownMenu;
