"use client";
import type { Upload } from "@prisma/client";
import { Download, Loader2 } from "lucide-react";
import { useState } from "react";
import saveFile from "save-file";

const TravelDetailsDownloadButton = ({ upload }: { upload: Upload }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const handleDownload = async () => {
    if (isDownloading) {
      return;
    }
    setIsDownloading(true);
    try {
      const response = await fetch(`/api/uploads?uploadId=${upload.id}`);
      const blob = await response.blob();
      if (!blob) {
        return;
      }
      setIsDownloading(false);
      await saveFile(blob, upload.title + "." + upload.fileType);
    } catch (error) {
      console.log(error);
      alert("Failed to download file");
    } finally {
      setIsDownloading(false);
    }
  };
  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={isDownloading}
      className="disabled:opacity-50"
    >
      {isDownloading ? (
        <Loader2 className="size-6 animate-spin" />
      ) : (
        <Download className="size-6" />
      )}
    </button>
  );
};

export default TravelDetailsDownloadButton;
