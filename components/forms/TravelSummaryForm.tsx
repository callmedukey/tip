"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TravelSummaryFormSchema } from "@/definitions/zod";
import { Button } from "../ui/button";
import { SummaryArray } from "@/definitions/request-details";
import { useSearchParams } from "next/navigation";
import { saveRequestSummary } from "@/actions/admin";

const TravelSummaryForm = ({ summary }: { summary?: SummaryArray | null }) => {
  const searchParams = useSearchParams();
  const requestId = searchParams.get("id");
  const form = useForm<z.infer<typeof TravelSummaryFormSchema>>({
    resolver: zodResolver(TravelSummaryFormSchema),
    defaultValues: {
      json: summary || [{ label: "", value: "" }],
    },
  });

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control: form.control, // control props comes from useForm (optional: if you are using FormProvider)
      name: "json", // unique name for your Field Array
    }
  );

  const onSubmit = async (data: z.infer<typeof TravelSummaryFormSchema>) => {
    const response = await saveRequestSummary({
      summary: data.json,
      requestId: requestId!,
    });

    if (response?.error) {
      return alert(response.error);
    }

    alert("저장되었습니다.");
  };
  return (
    <Form {...form}>
      <form className="mt-6 max-w-md" onSubmit={form.handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name={`json.${index}.label`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input
                      {...field}
                      className="p-1 ring-1 ring-black"
                      placeholder="제목"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`json.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input
                      {...field}
                      className="p-1 ring-1 ring-black"
                      placeholder="내용"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end items-center gap-4 col-span-2">
              {index > 0 && (
                <button type="button" onClick={() => move(index, index - 1)}>
                  위로
                </button>
              )}
              {index < fields.length - 1 && (
                <button type="button" onClick={() => move(index, index + 1)}>
                  아래로
                </button>
              )}
              <button type="button" onClick={() => remove(index)}>
                삭제
              </button>
            </div>
          </div>
        ))}
        <div className="flex justify-end items-center gap-4 mt-4">
          <Button variant="outline" type="submit">
            저장
          </Button>
          <Button
            type="button"
            onClick={() => append({ label: "", value: "" })}
          >
            추가
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TravelSummaryForm;
