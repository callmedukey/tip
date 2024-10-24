'use server'

import { randomUUID } from "crypto";
import { verifySession } from "./session";
import prisma from "@/lib/prisma";


export const generateSharedLink = async (requestId: string) => {
    try {
        const session = await verifySession();

        if (!session || !session.userId) return { message: "Unauthorized" };

        const existingSharedLink = await prisma.request.findUnique({
            where: { id: +requestId },
        });

        if (existingSharedLink?.sharedLink) return { success: true, sharedLink: existingSharedLink.sharedLink };

        const updatedRequest = await prisma.request.update({
            where: { id: +requestId },
            data: { sharedLink: randomUUID() },
        });
        if (!updatedRequest) return { message: "Error updating request" };


        return { success: true, sharedLink: updatedRequest.sharedLink };
    } catch (error) {
        console.error(error);
        return { message: "Failed to generate shared link" };
    }
}


export const disableSharedLink = async (requestId: string) => {
    try {
        const session = await verifySession();

        if (!session || !session.userId) return { message: "Unauthorized" };

        const existingSharedLink = await prisma.request.findUnique({
            where: { id: +requestId },
        });

        if (!existingSharedLink?.sharedLink) return { message: "Shared link is already disabled" };

        const updatedRequest = await prisma.request.update({
            where: { id: +requestId },
            data: { sharedLink: null },
        });

        if (!updatedRequest) return { message: "Error updating request" };

        return { message: "Shared link disabled successfully" };
 } catch (error){
    console.error(error);
    return {message: "Failed to disable shared link"}
 }   
}
