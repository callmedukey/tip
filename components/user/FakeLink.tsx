"use client";

import { cn } from "@/lib/utils";

const FakeLink = ({
  message,
  children,
  className,
}: {
  message: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <button
      type="button"
      onClick={() => {
        alert(message);
      }}
      className={cn(className)}
    >
      {children}
    </button>
  );
};

export default FakeLink;
