"use client";

import { togglePaid } from "@/actions/admin";
import { useTranslations } from "next-intl";

const TogglePaidButton = ({
  paidStatus,
  id,
}: {
  paidStatus: boolean;
  id: string;
}) => {
  const t = useTranslations("manageOrders");
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
      {paidStatus ? t("paid") : t("unpaid")}
    </button>
  );
};

export default TogglePaidButton;
