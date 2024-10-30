import React from "react";
import prisma from "@/lib/prisma";
import { MyTravelPDFInvoiceView } from "@/components/user/MyTravelInvoicePDF";

const page = async () => {
  const request = await prisma.request.findFirst({
    where: {
      id: 5,
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
    return <div>No request found</div>;
  }

  return (
    <main className="w-full">
      <MyTravelPDFInvoiceView request={request} />
    </main>
  );
};

export default page;
