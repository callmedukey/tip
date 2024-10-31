import SignupForm from "@/components/forms/SignupForm";
import { getTranslations } from "next-intl/server";

const SignupPage = async () => {
  const t = await getTranslations("signUpPage");
  return (
    <main className="min-screen py-16 px-4 text-formText">
      <div className="bg-white/85 max-w-7xl mx-auto pt-28 pb-12 rounded-[3rem] sm:rounded-[2rem]">
        <h1 className="text-center text-[1.875rem]/[100%]">{t("signUp")}</h1>
        <SignupForm />
      </div>
    </main>
  );
};

export default SignupPage;
