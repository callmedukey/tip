import React from 'react'
import prisma from '@/lib/prisma'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { generateOrderNumber } from '@/lib/generateOrderNumber'
import { redirect } from '@/i18n/routing'
import { verifySession } from '@/actions/session'
import { formatDateToKR } from '@/lib/time-formmater'
import { userLevelObject } from '@/lib/parseUserLevel'


const page  = async ({params:{userId}}:{params:{
    userId:string
}}) => { 
    const session = await verifySession ( )
    if (!session || !session.userId || session.accountType!=='Admin'){return redirect ("/login") }

    const user = await prisma.user.findUnique({where:{ id: userId }, include:{ requests: {
        orderBy: {createdAt:'desc'}}
    },omit: {password: true}})
    if (!user){ 
        return redirect("/admin/manage-users")
    }  
    
  return (
    
    <div className="text-white max-w-screen-8xl mx-auto">
    <div className='bg-white text-black'>
    <ul>
<li >
    <p>Name:{user.name}</p> 
    
 </li>

<li>
    <p>Email: {user.email} </p>
 </li>

<li>
    Phone Number:{user.phoneNumber}
</li>

<li>
    birthday:{formatDateToKR(user.birthday)}
   </li> 

<li>
    <p>gender: {user.gender}</p>
    </li>

<li>
    <p>extra: {user.extra} </p>
    </li>

<li>
    <p>bussiness number: {user.businessNumber}</p>
</li>

<li>
    <p>account type: {user.accountType}</p>
</li>

<li>
    <p>money spent: {user.moneySpent}</p>
</li>

<li> 
    <p>User Level : {userLevelObject[user.userLevel]} </p>
    </li>
    </ul>

    </div>
    <div className='bg-white rounded-md mt-12 relative text-black min-h-[50rem] max-h-[50rem] overflow-y-auto'>
    <Table className='text-black'>
    <TableHeader>
    <TableRow>
    <TableHead className='w-[100px] font-bold'>Requests</TableHead>    
    </TableRow>
    </TableHeader>
    <TableBody>{user?.requests.map((request)=> (  

    <TableRow key={request.id}>
    <TableCell>{generateOrderNumber(request.id)} </TableCell>
    <TableCell>{user.name}</TableCell>
    <TableCell>{user.email}</TableCell>
    <TableCell>{request.price}</TableCell>
    <TableCell> {request.paid} </TableCell>
</TableRow>
    ))}


    </TableBody>


    
    </Table>
    
    </div>.
    </div>
  )
}

export default page
