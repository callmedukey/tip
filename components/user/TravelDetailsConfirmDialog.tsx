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

const TravelDetailsConfirmDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const t = useTranslations("TravelDetailsConfirmDialog");
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 overflow-clip max-w-[500px] w-full rounded-3xl">
        <DialogHeader className="sr-only">
          <DialogTitle className="sr-only">{t("title")}</DialogTitle>
          <DialogDescription className="sr-only">
            {t("description")}
          </DialogDescription>
        </DialogHeader>
        <div className="relative isolate flex flex-col text-white items-center justify-center gap-8 py-8 px-4">
          <p className="text-[1.875rem] font-bold">{t("title")}</p>
          <div className="text-center">
            <p>{t("line1")}</p>
            <p>{t("line2")}</p>
          </div>
          <Image
            src={DialogImg}
            alt="dialog"
            fill
            className="object-fill -z-10"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TravelDetailsConfirmDialog;
