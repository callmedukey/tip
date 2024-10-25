import { verifySession } from "@/actions/session";
import TravelDetailsMain from "@/components/user/TravelDetailsMain";
import { redirect } from "@/i18n/routing";
import prisma from "@/lib/prisma";
import { LoadScript } from "@react-google-maps/api";

const TravelDetailsPage = async ({
  searchParams,
}: {
  searchParams: { id: string };
}) => {
  const { id } = searchParams;

  if (!id || isNaN(+id)) {
    return redirect("/my-travel");
  }

  const session = await verifySession();

  if (!session || !session.userId) {
    return redirect("/login");
  }

  const request = await prisma.request.findUnique({
    where: {
      id: +id,
      userId: session.userId,
    },
    include: {
      editRequests: true,
      uploads: true,
    },
  });

  if (!request) {
    return redirect("/my-travel");
  }

  return (
    <main className="max-w-screen-8xl mx-auto w-full px-4">
      <TravelDetailsMain request={request as any} />
    </main>
  );
};

export default TravelDetailsPage;
