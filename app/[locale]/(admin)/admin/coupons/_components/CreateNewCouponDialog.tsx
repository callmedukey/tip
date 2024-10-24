"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { CouponSchema } from "@/definitions/zod";
import { Button } from "@/components/ui/button";
import { createCoupon } from "@/actions/admin";

const CreateNewCouponDialog = () => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof CouponSchema>>({
    resolver: zodResolver(CouponSchema),
    defaultValues: {
      code: "",
      description: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof CouponSchema>) => {
    const response = await createCoupon(data);
    if (response.success) {
      form.reset();
      alert("Coupon created successfully");
      setOpen(false);
    } else {
      alert(response.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="py-2 px-4">Create New Coupon</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Coupon</DialogTitle>
          <DialogDescription>
            Create a new coupon with a unique code and description.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center relative">
                  <label htmlFor={field.name} className="sr-only">
                    Code
                  </label>
                  <FormControl>
                    <input
                      className="bg-transparent placeholder:text-formText pb-4 border-b-[0.5px] border-formText text-formText appearance-none focus:outline-none w-full text-base"
                      placeholder="Code*"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center relative">
                  <label htmlFor={field.name} className="sr-only">
                    Description
                  </label>
                  <FormControl>
                    <input
                      className="bg-transparent placeholder:text-formText pb-4 border-b-[0.5px] border-formText text-formText appearance-none focus:outline-none w-full text-base"
                      placeholder="Description*"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-8">
              Create
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewCouponDialog;
