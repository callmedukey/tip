// app/template.tsx
"use client";

import { useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // This ensures we handle the scroll after the page content is fully rendered
    const handleScroll = () => {
      const hash = window.location.hash;

      if (hash) {
        // Using requestAnimationFrame ensures we scroll after the browser's next paint
        requestAnimationFrame(() => {
          const element = document.getElementById(hash.slice(1));
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        });
      }
    };

    handleScroll();

    // We also want to handle the scroll when the URL changes
    window.addEventListener("hashchange", handleScroll);
    return () => window.removeEventListener("hashchange", handleScroll);
  }, [pathname, searchParams]);

  return <>{children}</>;
}
