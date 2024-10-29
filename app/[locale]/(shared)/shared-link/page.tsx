import TravelDetailsMain from "@/components/user/TravelDetailsMain";
import { redirect } from "@/i18n/routing";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

const page = async ({ searchParams }: { searchParams: { id: string } }) => {
  const { id } = searchParams;

  if (!id || typeof id !== "string") return redirect("/");

  const request = await prisma.request.findUnique({
    where: { sharedLink: id },
    include: {
      uploads: true,
    },
  });

  if (!request) return redirect("/");

  return (
    <main className="max-w-screen-8xl mx-auto w-full px-4">
      <TravelDetailsMain request={request as any} />
    </main>
  );
};

export default page;
