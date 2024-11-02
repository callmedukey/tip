"use server"
import { sendEmailInstance } from '@/lib/brevo';
import { emailTemplate } from '@/lib/brevo';
import prisma from '@/lib/prisma';
import { UserLevel } from '@prisma/client';
import { getLocale } from 'next-intl/server';
import { revalidatePath } from 'next/cache';

export async function updateUserLevel({userId, newLevel}:{userId:string, newLevel:UserLevel}) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        userLevel: newLevel, 
    }});
    if (updatedUser) {
    revalidatePath ('/[locale]/admin/manage-users','page')    
    
    const locale = await getLocale();
    sendEmailInstance({
      params: {
      },
      emailTemplate:
        locale === "ko" ? emailTemplate.accountLeveledUpKO : emailTemplate.accountLeveledUp,
      to: updatedUser.email,
    });

    return { success: true}; }
    else return { message: 'User update fail'}
    
  } catch (error) {
    console.error('Error updating user level:', error);
    return { success: false, message: 'Server side Error' };
  }
}
