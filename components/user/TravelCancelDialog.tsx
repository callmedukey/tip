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
import DialogImg from "@/public/dialog-1.png";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { cancelTrip } from "@/actions/user";
import type { Request } from "@prisma/client";
const TravelCancelDialog = ({
  open,
  setOpen,
  request,
  handleRevalidate,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  request: Request;
  handleRevalidate: () => void;
}) => {
  const t = useTranslations("TravelCancelDialog");
  const [canceled, setCanceled] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(t("areYouSure"));
  const [secondLine, setSecondLine] = useState(t("undo"));

  const handleCancel = async () => {
    try {
      const res = await cancelTrip(request.id, request.paid);
      if (res.success && request.paid) {
        handleRevalidate();
        setCurrentMessage(t("paidTripCanceled"));
        setSecondLine(t("secondLine"));
        setCanceled(true);
      }

      if (res.success && !request.paid) {
        setCurrentMessage(t("tripCanceled"));
        setCanceled(true);
        setSecondLine("");
        handleRevalidate();
      } else {
        setCurrentMessage(res.message || "");
        setSecondLine("");
      }
    } catch (error) {
      alert("Error");
    }
  };

  useEffect(() => {
    setSecondLine(t("undo"));
  }, [open, t]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 overflow-clip max-w-[500px] w-full rounded-3xl">
        <DialogHeader className="sr-only">
          <DialogTitle className="sr-only">{t("areYouSure")}</DialogTitle>
          <DialogDescription className="sr-only">
            {currentMessage}
          </DialogDescription>
        </DialogHeader>
        <div className="relative isolate flex flex-col text-white items-center justify-center gap-8 py-8 px-4">
          <p className="text-[1.875rem] font-bold text-center font-garamond text-pretty">
            {currentMessage}
          </p>
          <div className="text-center text-slate-200 font-garamond text-pretty text-lg font-medium">
            <p>{secondLine}</p>
          </div>
          <Image
            src={DialogImg}
            alt="dialog"
            fill
            className="object-fill -z-10"
          />
          <div className="flex gap-4 w-full">
            {!canceled && (
              <Button
                className="w-full flex-1 "
                variant="destructive"
                onClick={handleCancel}
              >
                {t("confirmCancel")}
              </Button>
            )}
            <Button
              className="w-full flex-1 text-black "
              variant="outline"
              onClick={() => setOpen(false)}
            >
              {t("exit")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TravelCancelDialog;
