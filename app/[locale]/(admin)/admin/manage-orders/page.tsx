import { verifySession } from "@/actions/session";
import { redirect } from "@/i18n/routing";
import ManageOrdersPage from "./_components/ManageOrdersPage";

export const dynamic = "force-dynamic";

const page = async () => {
  const session = await verifySession();

  if (!session || session.accountType !== "Admin") {
    return redirect("/admin/login");
  }

  return <ManageOrdersPage />;
};

export default page;
