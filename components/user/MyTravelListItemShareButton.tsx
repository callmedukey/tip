"use client";

import { disableSharedLink, generateSharedLink } from "@/actions/user";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

const MyTravelListItemShareButton = ({
  requestId,
  sharedLink,
}: {
  requestId: string;
  sharedLink: string | null;
}) => {
  const [copied, setCopied] = useState(false);
  const locale = useLocale();
  const t = useTranslations("MyTravelListItemShareButton");

  const handleCopyShareLink = async () => {
    if (!navigator) return;
    const {
      sharedLink: newSharedLink,
      success,
      message,
    } = await generateSharedLink(requestId);

    if (success && newSharedLink) {
      const shareUrl = `${
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : "https://travelinyourpocket.com"
      }/${locale}/shared-link?id=${newSharedLink}`;

      try {
        // Try modern clipboard API first
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
      } catch (err) {
        // Fallback for mobile devices
        const textArea = document.createElement("textarea");
        textArea.value = shareUrl;
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand("copy");
          setCopied(true);
        } catch (err) {
          console.error("Failed to copy:", err);
          alert(t("copyFailed"));
        }
        document.body.removeChild(textArea);
      }
    } else {
      alert(message);
    }
  };

  const handleDisableSharing = async () => {
    const { message } = await disableSharedLink(requestId);

    if (message) alert(message);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="bg-transparent text-egyptianBlue border border-egyptianBlue max-w-xs w-full lg:w-[15rem] py-4 rounded-full font-medium"
          type="button"
        >
          {t("share")}
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("shareYourTravel")}</DialogTitle>
          <DialogDescription>
            {t("shareYourTravelDescription")}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 my-8">
          <button
            className="text-formText text-base font-medium"
            onClick={handleCopyShareLink}
            type="button"
          >
            {copied ? t("linkCopied") : t("copyShareLink")}
          </button>
          <button
            className="text-formText text-base font-medium text-red-500"
            onClick={handleDisableSharing}
            type="button"
          >
            {t("disableSharing")}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MyTravelListItemShareButton;
