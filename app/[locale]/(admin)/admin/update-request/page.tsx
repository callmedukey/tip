import { verifySession } from "@/actions/session";
import { redirect } from "@/i18n/routing";
import ManageUpdateRequests from "./_components/ManageUpdateRequests";

export const dynamic = "force-dynamic";

const AdminUpdateRequestPage = async () => {
  const session = await verifySession();
  if (!session || !session.userId) {
    return redirect("/login");
  }

  return <ManageUpdateRequests />;
};

export default AdminUpdateRequestPage;
