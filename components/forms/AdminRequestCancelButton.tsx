"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { cancelRequest } from "@/actions/admin";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
const AdminRequestCancelButton = () => {
  const t = useTranslations("adminPlanner");
  const searchParams = useSearchParams();
  const requestId = searchParams.get("id");
  const router = useRouter();
  const cancelOrderRequest = async () => {
    if (!requestId) {
      return;
    }
    const response = await cancelRequest({ requestId });
    if (response?.error) {
      return alert(response?.error);
    }

    alert("취소 완료");
    router.push("/admin/new-request");
  };
  return (
    <Button
      type="button"
      variant={"destructive"}
      onClick={cancelOrderRequest}
      className="flex max-w-sm mx-auto w-full"
    >
      {t("cancel")}
    </Button>
  );
};

export default AdminRequestCancelButton;
