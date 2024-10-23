import { redirect } from "@/i18n/routing";
import { verifySession } from "@/actions/session";
import ManageSalesPage from "./_components/ManageSalesPage";

export const dynamic = "force-dynamic";

const SalesPage = async () => {
  const session = await verifySession();

  if (!session || !session.userId || session.accountType !== "Admin") {
    return redirect("/login");
  }

  return (
    <>
      <ManageSalesPage />
    </>
  );
};

export default SalesPage;
