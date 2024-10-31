"use client";

import { sendRequestToCustomer } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

const PlannerSaveAndSend = ({ paid }: { paid: boolean }) => {
  const searchParams = useSearchParams();
  const t = useTranslations("adminPlanner");
  const requestId = searchParams.get("id");

  const handleSend = async () => {
    const response = await sendRequestToCustomer({
      requestId: requestId as string,
      paid,
    });
    if (response.error) {
      alert(response.message);
    } else {
      alert("Sent to customer.");
    }
  };

  return (
    <div className="my-6 flex items-center justify-center">
      <Button
        variant={"outline"}
        onClick={handleSend}
        type="button"
        className="w-full bg-blue-300 max-w-sm mx-auto"
      >
        {t("sendToUser")}
      </Button>
    </div>
  );
};

export default PlannerSaveAndSend;
