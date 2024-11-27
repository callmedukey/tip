"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import Image from "next/image";
import DialogImg from "@/public/dialog-2.png";
import { useState } from "react";
import { confirmTrip } from "@/actions/user";
import { useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { useRouter } from "@/i18n/routing";

const TravelDetailsConfirmDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const t = useTranslations("TravelDetailsConfirmDialog");
  const [confirmed, setConfirmed] = useState(false);
  const [title, setTitle] = useState(t("confirm"));
  const [message, setMessage] = useState(t("description"));
  const searchParams = useSearchParams();
  const requestId = searchParams.get("id");
  const router = useRouter();

  const handleConfirm = async () => {
    if (!requestId) return;
    const res = await confirmTrip(parseInt(requestId));
    if (res.message) {
      setMessage(res.message);
    }

    if (res.success) {
      setConfirmed(true);
      setTitle(t("confirmed"));
      setMessage(t("description"));

      setTimeout(() => {
        setOpen(false);
        router.refresh();
      }, 2000);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 overflow-clip max-w-[500px] w-full !rounded-[3rem]">
        <DialogHeader className="sr-only">
          <DialogTitle className="sr-only">{t("confirm")}</DialogTitle>
          <DialogDescription className="sr-only">
            {t("description")}
          </DialogDescription>
        </DialogHeader>
        <div className="relative isolate flex flex-col text-white items-center justify-center gap-8 py-8 px-4">
          <p className="text-[1.875rem] font-bold text-center max-w-[25rem] mx-auto">
            {title}
          </p>
          <div className="text-center">
            <p>{message}</p>
          </div>
          <Image
            src={DialogImg}
            alt="dialog"
            fill
            className="object-fill -z-10"
          />
          <div className="flex gap-4 w-full">
            {!confirmed && (
              <>
                <Button
                  className="w-full flex-1 bg-[#163986] text-white"
                  onClick={handleConfirm}
                >
                  {t("accept")}
                </Button>
                <Button
                  className="w-full flex-1 text-black "
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  {t("exit")}
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TravelDetailsConfirmDialog;
