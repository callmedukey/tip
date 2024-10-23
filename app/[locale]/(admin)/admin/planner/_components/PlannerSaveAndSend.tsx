"use client";

import { sendRequestToCustomer } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

const PlannerSaveAndSend = () => {
  const searchParams = useSearchParams();
  const requestId = searchParams.get("id");

  const handleSend = async () => {
    const response = await sendRequestToCustomer({
      requestId: requestId as string,
    });
    if (response.error) {
      alert(response.message);
    } else {
      alert("고객에게 전달되었습니다.");
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
        고객에게 전달하기
      </Button>
    </div>
  );
};

export default PlannerSaveAndSend;
