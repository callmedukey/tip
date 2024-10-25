"use client";
import { deleteAdminUploads } from "@/actions/admin-uploads";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { AdminFileUploadsSchema } from "@/definitions/zod";
import { useRouter } from "@/i18n/routing";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload } from "@prisma/client";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const AdminFileUploads = ({
  requestId,
  uploads,
}: {
  requestId: number;
  uploads: Upload[];
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof AdminFileUploadsSchema>>({
    resolver: zodResolver(AdminFileUploadsSchema),
    defaultValues: {
      title: "",
      requestId: requestId,
    },
  });

  const onSubmit = async (data: z.infer<typeof AdminFileUploadsSchema>) => {
    setIsLoading(true);
    if (!data.file || data.file?.length === 0) {
      alert("File is required");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("requestId", data.requestId.toString());
      formData.append("file", data.file[0]);

      const response = await fetch("/api/admin/uploads", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.message) {
        alert(result.message);
      } else if (result.success) {
        alert("File uploaded successfully");

        if (window) {
          window.location.reload();
        }
      }
    } catch (error) {
      console.error(error);
      alert("Error uploading file");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setIsLoading(true);

      if (isLoading) return;
      const response = await deleteAdminUploads({ uploadId: id });
      if (response.message) {
        alert(response.message);
      } else if (response.success) {
        alert("File deleted successfully");
        if (window) {
          window.location.reload();
        }
      }
    } catch (error) {
      console.error(error);
      alert("Error deleting file");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <div className="flex flex-col gap-4">
        {uploads.map((upload) => (
          <div
            key={upload.id}
            className="grid grid-cols-[auto_1fr] gap-4 max-w-md gap-y-2 hover:bg-gray-200 p-2 rounded-md"
          >
            <div className="flex flex-col gap-2 items-start justify-center">
              <div className="text-sm">{upload.title}</div>
              <div className="text-xs">{upload.fileType}</div>
            </div>
            <div className="flex items-center justify-end">
              <button
                type="button"
                className="hover:text-red-500"
                disabled={isLoading}
                onClick={() => handleDelete(upload.id)}
              >
                <Trash2 />
              </button>
            </div>
          </div>
        ))}
      </div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-4 grid grid-cols-2 gap-4 border-t-2 border-black py-4 max-w-md"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center relative">
              <label htmlFor={field.name} className="sr-only">
                제목
              </label>
              <FormControl>
                <input
                  className="bg-transparent placeholder:text-formText pb-4 h-12 !mb-0 border-b-[0.5px] border-formText text-formText appearance-none focus:outline-none w-full text-base"
                  placeholder="제목*"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center relative">
              <label htmlFor={field.name} className="sr-only">
                File
              </label>
              <FormControl>
                <input
                  required
                  className="bg-transparent placeholder:text-formText h-12 pb-4 border-b-[0.5px] border-formText text-formText appearance-none focus:outline-none w-full text-base"
                  {...form.register("file")}
                  type="file"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="mt-4">
          {isLoading ? "Uploading..." : "Upload"}
        </Button>
      </form>
    </Form>
  );
};

export default AdminFileUploads;
