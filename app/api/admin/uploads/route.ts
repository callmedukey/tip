
import { verifySession } from "@/actions/session";
import { AdminFileUploadsSchema } from "@/definitions/zod";
import { getExtensionAdvanced } from "@/lib/extractFileExtension";
import prisma from "@/lib/prisma";
import path from "path";
import fs from "fs/promises";
import { existsSync } from "fs";
import { revalidatePath } from "next/cache";


export async function POST(request: Request) {
  try {
    const session = await verifySession();

    if (!session || session.accountType !== "Admin" || !session.userId) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
  
    const parsedData = AdminFileUploadsSchema.safeParse({
        title: formData.get("title"),
        requestId: formData.get("requestId"),
    });
    const file = formData.get("file") as File;
    if (!parsedData.success) {
      return Response.json({ message: "Invalid request" }, { status: 400 });
    }

    if (!file) {
      return Response.json({ message: "File is required" }, { status: 400 });
    }
    const extension = getExtensionAdvanced(file.name);

    if (!extension) {
      return Response.json({ message: "Invalid file" }, { status: 400 });
    }  
    
    const created = await prisma.upload.create({
      data: {
        title: parsedData.data.title,
        fileType: extension,
        requestId: parsedData.data.requestId,
      },
    });
  
      if (!created) {
        return Response.json({ message: "Error creating upload" }, { status: 500 });
      }
  
      const dir = process.cwd();
      const directory = path.join(dir, "uploads/");
      
      if (!existsSync(directory)) {
        await fs.mkdir(directory, { recursive: true });
      }
      const filePath = path.join(
        dir,
        "uploads/",
        created.id + "." + extension
      );

    const buffer = await (file as File).arrayBuffer();

    await fs.writeFile(filePath, Buffer.from(buffer));
    revalidatePath("[]/admin/planner", "page");

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Server Error - Admin Uploads" },
      { status: 500 }
    );
  }
}
