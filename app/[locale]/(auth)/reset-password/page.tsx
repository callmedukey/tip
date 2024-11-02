import { getTranslations } from "next-intl/server";
import ResetPasswordForm from "./_components/ResetPasswordForm";

const page = async () => {
  const t = await getTranslations("resetPassword");
  return (
    <main className="min-screen py-16 px-4 text-formText">
      <div className="bg-white/85 max-w-7xl mx-auto py-28 sm:py-20 rounded-[3rem] sm:rounded-[2rem]">
        <h1 className="text-center text-[1.875rem]/[100%]">
          {t("resetPassword")}
        </h1>
        <ResetPasswordForm />
      </div>
    </main>
  );
};

export default page;
