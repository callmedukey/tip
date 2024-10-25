"use client";

import { togglePaid } from "@/actions/admin";
import React from "react";

const TogglePaidButton = ({
  paidStatus,
  id,
}: {
  paidStatus: boolean;
  id: string;
}) => {
  async function togglePaymentStatus() {
    const response = await togglePaid({ id, currentStatus: paidStatus });
    if (response?.message) {
      alert(response.message);
    }

    if (response?.success) {
      alert("Payment Status Toggled");
      window.location.reload();
    }
  }
  return (
    <button onClick={togglePaymentStatus}>
      {paidStatus ? "Paid" : "Unpaid"}
    </button>
  );
};

export default TogglePaidButton;
