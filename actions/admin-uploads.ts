"use server";
import prisma from "@/lib/prisma";
import path from "path";
import fs from "fs/promises";
import { verifySession } from "./session";
import { existsSync } from "fs";


export const deleteAdminUploads = async ({uploadId}: {uploadId: string}) => {
  try {
    const session = await verifySession();
    if (!session || session.accountType !== "Admin" || !session.userId) {
      return { message: "Unauthorized" };
    }

    const deleted = await prisma.upload.delete({
      where: {
        id: uploadId,
      },
    });

    if (!deleted) {
      return { message: "File does not exist" };
    }

    const dir = process.cwd();
    const filePath = path.join(dir, "uploads/", uploadId + "." + deleted.fileType);

    const directory = path.join(dir, "uploads/");

    if (existsSync(directory)) {
      await fs.rm(filePath);
    } else {
      return { message: "Directory does not exist" };
    }

    return { success: true };
  } catch (error) {
    console.error(error);
    return { message: "Server Error - Admin Uploads" };
  }
};

