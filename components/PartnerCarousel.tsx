"use client";
import Image from "next/image";
import Partner1 from "@/public/partners/1.png";
import Partner2 from "@/public/partners/2.png";
import Partner3 from "@/public/partners/3.png";
import Partner4 from "@/public/partners/4.png";
import Partner5 from "@/public/partners/5.png";
import Partner6 from "@/public/partners/6.png";
import Partner7 from "@/public/partners/7.png";
import Partner8 from "@/public/partners/8.png";
import Partner9 from "@/public/partners/9.png";
import Partner11 from "@/public/partners/11.png";
import Partner12 from "@/public/partners/12.png";
import Partner13 from "@/public/partners/13.png";
import Partner14 from "@/public/partners/14.png";
import Partner15 from "@/public/partners/15.png";
import Partner16 from "@/public/partners/16.png";
import Partner17 from "@/public/partners/17.png";
import Partner18 from "@/public/partners/18.png";
import Partner19 from "@/public/partners/19.png";
import Partner20 from "@/public/partners/20.png";
import Partner21 from "@/public/partners/21.png";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

const items = [
  Partner1,
  Partner2,
  Partner3,
  Partner4,
  Partner5,
  Partner6,
  Partner7,
  Partner8,
  Partner9,
  Partner11,
  Partner12,
  Partner13,
  Partner14,
  Partner15,
  Partner16,
  Partner17,
  Partner18,
  Partner19,
  Partner20,
  Partner21,
];

export const PartnerCarousel = ({
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  });

  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "60s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20  max-w-7xl overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          " flex min-w-full shrink-0 gap-12 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <Image
            src={item}
            alt="partner"
            key={idx}
            quality={100}
            width={100}
            priority
            className="object-contain"
          />
        ))}
      </ul>
    </div>
  );
};
