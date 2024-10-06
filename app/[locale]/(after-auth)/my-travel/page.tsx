import { verifySession } from "@/actions/session";
import UserBadge from "@/components/user/UserBadge";
import prisma from "@/lib/prisma";
import { redirect } from "@/i18n/routing";
import MyTravelList from "@/components/user/MyTravelList";
import MyTravelHistoryItems from "@/components/user/MyTravelHistoryItems";

const page = async () => {
  const session = await verifySession();

  if (!session) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session?.userId,
    },
    omit: {
      password: true,
    },
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="min-h-[calc(100vh-var(--header-height))] py-12 lg:py-24 px-4 max-w-screen-8xl mx-auto">
      <div className="flex lg:gap-36 gap-4 lg:flex-row flex-col items-start lg:items-center">
        <h1 className="text-[1.5rem] text-white">Welcome {user?.name}</h1>
        <UserBadge userLevel={user?.userLevel ?? null} />
      </div>
      <div className="lg:bg-white bg-white/85 rounded-[2rem] px-8 sm:px-16 py-12 lg:py-4 lg:px-4 xl:px-8 mt-24 lg:mt-16 relative">
        <MyTravelList />
        {/* dasfsa */}
      </div>
      <div className="bg-white mt-12 rounded-[2rem] w-full mx-auto  px-16 py-12 lg:p-8">
        <h2 className="text-formText lg:text-accountGrayText text-base lg:text-[1.5rem] lg:font-medium lg:text-left text-center mb-6">
          History
        </h2>
        <MyTravelHistoryItems />
      </div>
    </main>
  );
};

export default page;
