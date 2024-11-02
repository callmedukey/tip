import { redirect } from "@/i18n/routing";
import prisma from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import FinalResetPasswordForm from "./_components/FinalResetPasswordForm";4
export const dynamic = "force-dynamic";

const page = async ({ params }: { params: { resetChanceId: string } }) => {
  const t = await getTranslations("resetPasswordChance");
  const resetChance = await prisma.resetChance.findUnique({
    where: {
      id: params.resetChanceId,
    },
  });

  if (!resetChance) {
    return redirect("/reset-password");
  }

  return (
    <main className="min-screen py-16 px-4 text-formText">
      <div className="bg-white/85 max-w-7xl mx-auto py-28 sm:py-20 rounded-[3rem] sm:rounded-[2rem]">
        <h1 className="text-center text-[1.875rem]/[100%]">
          {t("resetPassword")}
        </h1>
        <FinalResetPasswordForm resetChanceId={params.resetChanceId} />
      </div>
    </main>
  );
};

export default page;
