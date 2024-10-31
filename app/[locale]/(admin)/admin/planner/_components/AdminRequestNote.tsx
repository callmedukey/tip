"use client";

import { updateRequestNote } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function AdminRequestNote({
  requestId,
  note,
}: {
  requestId: number;
  note: string | null;
}) {
  const [newNote, setNewNote] = useState(note || "");
  const t = useTranslations("adminPlanner");
  const handleSave = async () => {
    const response = await updateRequestNote({ requestId, note: newNote });
    if (response.message) {
      alert(response.message);
      return;
    }

    if (response.success) {
      alert("저장되었습니다.");
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-md mt-8 mx-auto">
      <p className="text-lg font-bold">{t("msgToUser")}</p>
      <textarea
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        rows={5}
        className="w-full max-w-md shadow-md rounded-md p-2"
      />
      <Button onClick={handleSave} type="button">
        {t("save")}
      </Button>
    </div>
  );
}
