import { verifySession } from "@/actions/session";
import { redirect } from "@/i18n/routing";

import prisma from "@/lib/prisma";
import { getLocale } from "next-intl/server";
import InvoicePrintPage from "./_components/InvoicePrintPage";
const page = async ({
  searchParams,
}: {
  searchParams: { requestId: string };
}) => {
  const requestId = searchParams.requestId;

  if (!requestId) {
    return redirect("/my-travel");
  }

  const session = await verifySession();

  if (!session || !session.userId) {
    return redirect("/login");
  }

  const request = await prisma.request.findUnique({
    where: {
      id: +requestId,
      userId: session.userId,
      NOT: {
        price: null,
        currency: null,
      },
    },
    include: {
      user: {
        omit: {
          password: true,
        },
      },
    },
  });

  if (!request) {
    return redirect("/my-travel");
  }
  const locale = await getLocale();
  return (
    <main className="max-w-screen-8xl mx-auto w-full px-4 py-16 print:py-0">
      <InvoicePrintPage locale={locale} request={request} />
    </main>
  );
};

export default page;
