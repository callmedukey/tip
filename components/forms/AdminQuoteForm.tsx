"use client";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdminQuoteFormSchema } from "@/definitions/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { issueQuote } from "@/actions/admin";
import { useSearchParams } from "next/navigation";

const AdminQuoteForm = () => {
  const searchParams = useSearchParams();
  const requestId = searchParams.get("id");
  const form = useForm<z.infer<typeof AdminQuoteFormSchema>>({
    resolver: zodResolver(AdminQuoteFormSchema),
    defaultValues: {
      price: "" as unknown as number,
      currency: "",
      link: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof AdminQuoteFormSchema>) => {
    if (data.price <= 0) {
      return alert("Price needs to be above 0.");
    }

    const response = await issueQuote({
      ...data,
      requestId: requestId as string,
    });

    if (response?.error) {
      return alert(response.error);
    }

    alert("Quote has been sent.");
  };

  return (
    <Form {...form}>
      <form className="max-w-md" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem className="">
              <label htmlFor={field.name} className="sr-only">
                총금액
              </label>
              <FormControl>
                <input
                  placeholder="총금액"
                  {...field}
                  className="p-1 font-normal placeholder:text-black"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem className="">
              <label htmlFor={field.name} className="sr-only">
                통화
              </label>
              <FormControl>
                <input
                  placeholder="통화 3자"
                  {...field}
                  className="p-1 font-normal placeholder:text-black"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem className="">
              <label htmlFor={field.name} className="sr-only">
                결제링크
              </label>
              <FormControl>
                <input
                  placeholder="결제링크"
                  {...field}
                  className="p-1 font-normal placeholder:text-black"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-6">
          견적 보내기
        </Button>
      </form>
    </Form>
  );
};

export default AdminQuoteForm;
