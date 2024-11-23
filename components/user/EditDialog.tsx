import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import Image from "next/image";
import DialogImg from "@/public/dialog-1.png";

const EditDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const t = useTranslations("EditDialog");
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 overflow-clip max-w-[600px] w-full">
        <DialogHeader className="sr-only">
          <DialogTitle className="sr-only">{t("title")}</DialogTitle>
          <DialogDescription className="sr-only">
            {t("description")}
          </DialogDescription>
        </DialogHeader>
        <div className="relative isolate flex flex-col text-white items-center justify-center gap-8 py-24 px-4">
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

export default EditDialog;
