
import { verifySession } from "@/actions/session";
import {  redirect } from "@/i18n/routing";
import ManageUsersPage from "./_components/ManageUsersPage";


const Page = async () => {
  const session = await verifySession();
  if (!session || !session.userId || session.accountType !== "Admin") {
    return redirect("/login");
  }

  return <ManageUsersPage />;
};

export default Page;
