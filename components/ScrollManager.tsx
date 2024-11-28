"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function ScrollManager() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== "undefined") {
      history.scrollRestoration = "manual";
    }
  }, [pathname, searchParams]);

  return null;
}
