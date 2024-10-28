import { MyTravelPDFView } from "@/components/user/MyTravelPDF";
import React from "react";
import prisma from "@/lib/prisma";

const page = async () => {
  const request = await prisma.request.findFirst({
    where: {
      id: 5,
    },
  });
  return (
    <main className="w-full">
      <MyTravelPDFView request={request as any} />;
    </main>
  );
};

export default page;
