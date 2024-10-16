import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import prisma from '@/lib/prisma';
import { verifySession } from '@/actions/session';
import { Link, redirect } from '@/i18n/routing';
import { formatDateToKR } from '@/lib/time-formmater';
import { userLevelObject } from '@/lib/parseUserLevel';
import { SquareArrowOutUpRight } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import UpdateUserLevelButton from '@/components/admin-update/updateUserLevelButton';
import UpdateMoneySpentButton from '@/components/admin-update/updateMoneySpentButton'; // Import the component
import { UserLevel } from '@prisma/client';

const Page = async () => {
  const session = await verifySession();
  if (!session || !session.userId || session.accountType !== 'Admin') {
    return redirect("/login");
  }

  const users = await prisma.user.findMany({
    where: {},
    select: {
      name: true,
      id: true,
      email: true,
      moneySpent: true,
      userLevel: true,
      gender: true,
      birthday: true,
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="text-white max-w-screen-8xl mx-auto">
      <h1 className="text-2xl font-bold">회원 관리</h1>
      <div className="bg-white rounded-md mt-12 relative text-black min-h-[50rem] max-h-[50rem] overflow-y-auto">
        <Table className='text-black'>
          <TableHeader className=''>
            <TableRow className=''>
              <TableHead className='w-[100px] font-bold'>이름</TableHead>
              <TableHead className='font-bold'>이메일</TableHead>
              <TableHead className='font-bold'>누적 결제 금액</TableHead>
              <TableHead className='font-bold'>회원 등급</TableHead>
              <TableHead className='font-bold'>개인 정보</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className='min-w-[20rem]'>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.moneySpent}
                  <Dialog>
                    <DialogTrigger asChild>
                      <button
                        className="ml-2 px-2 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                      >
                        Edit
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Money Spent</DialogTitle>
                        <DialogDescription>
                          Edit the amount of money spent by the user.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="mt-4">
                        <p>User: {user.name}</p>
                        <p>Current Amount: {user.moneySpent}</p>
                        <UpdateMoneySpentButton 
                          userId={user.id} 
                          currentMoneySpent={user.moneySpent} 
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell>
                  {userLevelObject[user.userLevel]}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className="ml-2 px-2 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                      >
                        Change it
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='flex flex-col gap-2'>
                      {Object.entries(userLevelObject).map(([key, value]) => {
                        return (
                          <DropdownMenuItem asChild key={key}>
                            <UpdateUserLevelButton 
                              userId={user.id} 
                              userLevelKey={key as UserLevel} 
                              value={value} 
                            />
                          </DropdownMenuItem>
                        );
                      })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
                <TableCell>{user.gender} {formatDateToKR(user.birthday)}</TableCell>
                <TableCell>
                  <Link href={`/admin/manage-users/${user.id}`}>
                    <SquareArrowOutUpRight />
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

export default Page;
