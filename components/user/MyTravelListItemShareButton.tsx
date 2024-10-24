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
import { useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
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

  const handleCopyShareLink = async () => {
    if (!navigator) return;
    const { sharedLink, success, message } = await generateSharedLink(
      requestId
    );

    if (success && sharedLink) {
      navigator.clipboard.writeText(
        `${
          process.env.NODE_ENV === "development"
            ? "http://localhost:3000"
            : "https://travelinyourpocket.com"
        }/${locale}/shared-link?id=${sharedLink}`
      );
      setCopied(true);
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
          Share
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share your travel</DialogTitle>
          <DialogDescription>
            Share your travel plans with your friends and family!
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 my-8">
          <button
            className="text-formText text-base font-medium"
            onClick={handleCopyShareLink}
            type="button"
          >
            {copied ? "Link Copied!" : "Copy Share Link"}
          </button>
          <button
            className="text-formText text-base font-medium text-red-500"
            onClick={handleDisableSharing}
            type="button"
          >
            Disable Sharing
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MyTravelListItemShareButton;
