import { verifySession } from "@/actions/session";
import { Link, redirect } from "@/i18n/routing";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import prisma from "@/lib/prisma";
import { formatDateToKR, formatDateToUTC } from "@/lib/time-formmater";

export const dynamic = "force-dynamic";

const AdminNewRequestPage = async () => {
  const session = await verifySession();

  if (!session || !session.userId) {
    return redirect("/login");
  }

  const requests = await prisma.request.findMany({
    where: {
      price: null,
      canceled: false,
    },
    include: {
      user: {
        omit: {
          password: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <div className="text-white max-w-screen-8xl mx-auto">
      <h1 className="text-2xl font-bold">새 문의 확인</h1>
      <div className="bg-white rounded-md mt-12 relative text-black min-h-[50rem] max-h-[50rem] overflow-y-auto">
        <Table className="text-black">
          <TableHeader className="">
            <TableRow className="">
              <TableHead className="w-[100px] font-bold">순번</TableHead>
              <TableHead className="font-bold">이름</TableHead>
              <TableHead className="font-bold">이메일</TableHead>
              <TableHead className="font-bold">날짜</TableHead>
              <TableHead className=""></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className=" text-black max-h-[500px] overflow-y-auto">
            {requests.map((request, index) => (
              <TableRow key={request.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{request.user.name}</TableCell>
                <TableCell>{request.user.email}</TableCell>
                <TableCell className="">{`${formatDateToKR(
                  formatDateToUTC(request.from) as unknown as Date
                )} ~ ${formatDateToKR(
                  formatDateToUTC(request.to) as unknown as Date
                )}`}</TableCell>
                <TableCell>
                  <Link
                    href={`/admin/planner?id=${request.id}`}
                    className="bg-black text-white py-1 px-2 rounded-md"
                  >
                    플래너
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminNewRequestPage;