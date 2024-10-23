import { verifySession } from "@/actions/session";
import { redirect } from "@/i18n/routing";
import { generateOrderNumber } from "@/lib/generateOrderNumber";

const RequestDetailPage = async ({
  params,
}: {
  params: { requestId: string };
}) => {
  const session = await verifySession();
  if (!session || !session.userId || session.accountType !== "Admin") {
    return redirect("/login");
  }

  if (!params.requestId || !Number(params.requestId)) {
    return redirect("/admin/manage-orders");
  }

  return (
    <div className="text-white max-w-screen-8xl mx-auto">
      <h1 className="text-2xl font-bold">
        Order Number {generateOrderNumber(+params.requestId)}
      </h1>
    </div>
  );
};

export default RequestDetailPage;
