import { verifySession } from "@/actions/session";
import { redirect } from "@/i18n/routing";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await verifySession();
  if (session?.accountType !== "Admin") {
    redirect("/");
  }
  return <main className="px-4 py-16">{children}</main>;
};

export default layout;
