"use server";
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function updateUserMoneySpent({ userId, moneySpent }: { userId: string, moneySpent: number }) {
  try {
    // Update the user's moneySpent value in the database
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        moneySpent, // Set the new moneySpent value
      },
    });

    if (updatedUser) {
      revalidatePath(`/admin/manage-users`);
      return { success: true };
    } else {
      return { success: false, message: 'Money update failed' };
    }
  } catch (error) {
    console.error('Error updating money spent:', error);
    return { success: false, message: 'Server-side error' };
  }
}
