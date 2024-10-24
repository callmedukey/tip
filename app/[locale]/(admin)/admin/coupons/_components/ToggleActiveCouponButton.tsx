"use client";

import { toggleActiveCoupon } from "@/actions/admin";
import React, { useState } from "react";

const ToggleActiveCouponButton = ({
  active,
  couponId,
}: {
  active: boolean;
  couponId: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleActiveCoupon = async () => {
    setIsLoading(true);
    const response = await toggleActiveCoupon({
      couponId: couponId,
      active: active,
    });

    if (response.success) {
      alert("Coupon status updated successfully");
    } else {
      alert(response.message);
    }

    setIsLoading(false);
  };

  return (
    <button
      disabled={isLoading}
      type="button"
      onClick={handleToggleActiveCoupon}
    >
      {active ? "활성" : "비활성"}
    </button>
  );
};

export default ToggleActiveCouponButton;
