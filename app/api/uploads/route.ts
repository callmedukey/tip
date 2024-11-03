import prisma from "@/lib/prisma";
import { readFile } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET(req: Request){
    try {

    const { searchParams } = new URL(req.url);
    const uploadId = searchParams.get("uploadId");

    if (!uploadId) {
      return new Response("Upload ID is required", { status: 400 });
    }

    const upload = await prisma.upload.findUnique({
      where: { id: uploadId },
    });

    if (!upload) {
      return new Response("Upload not found", { status: 404 });
    }

    const directory = path.join(process.cwd(), "uploads");
    const filePath = path.join(directory, upload.id + "." + upload.fileType);
    console.log(filePath);
    const file = await readFile(filePath);

    if (!file) {
      return new Response("File not found", { status: 404 });
    }

    return new Response(file, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${upload.id}.${upload.fileType}"`,
      },
    });
    
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
