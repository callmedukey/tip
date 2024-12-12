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

import { CopyToClipboard } from "react-copy-to-clipboard";

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
    const {
      sharedLink: newSharedLink,
      success,
      message,
    } = await generateSharedLink(requestId);

    if (!success || !newSharedLink) {
      alert(message);
      return;
    }

    setCopied(true);
    // Reset the copied state after 2 seconds
    setTimeout(() => setCopied(false), 2000);
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
          <CopyToClipboard
            text={`${
              process.env.NODE_ENV === "development"
                ? "http://localhost:3000"
                : "https://travelinyourpocket.com"
            }/${locale}/shared-link?id=${sharedLink}`}
            onCopy={() => setCopied(true)}
          >
            <button
              className="text-formText text-base font-medium"
              type="button"
            >
              {copied ? t("linkCopied") : t("copyShareLink")}
            </button>
          </CopyToClipboard>
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
