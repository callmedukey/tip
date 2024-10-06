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

import { loginSchema } from "@/definitions/auth";
import { useForm } from "react-hook-form";
import { Link, useRouter } from "@/i18n/routing";
import { login } from "@/actions/auth";
import { useAuth } from "../context/AuthContext";
import type { Session } from "@/actions/session";

const LoginForm = () => {
  const [session, setSession, logoutSession] = useAuth();
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    const response = await login(data);

    if (response?.success) {
      setSession({
        userId: response?.userId,
        accountType: response?.accountType,
        name: response?.name,
        
      } as Session);

      router.replace("/");
    }
    if (response?.error) {
      alert(response.error);
    }
  };

  return (
    <Form {...form}>
      <form
        className="bg-transparent max-w-xl mx-auto mt-24 px-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center relative">
              <label htmlFor={field.name} className="sr-only">
                이메일
              </label>
              <FormControl>
                <input
                  className="bg-transparent placeholder:text-formText pb-4 border-b-[0.5px] border-formText text-formText appearance-none focus:outline-none w-full text-base"
                  placeholder="E-mail*"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center relative mt-12">
              <label htmlFor={field.name} className="sr-only">
                이메일
              </label>
              <FormControl>
                <input
                  type="password"
                  className="bg-transparent placeholder:text-formText pb-4 border-b-[0.5px] border-formText text-formText appearance-none focus:outline-none w-full text-base"
                  placeholder="Password*"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Link
          href="/reset-password"
          className="mt-8 block underline text-[0.75rem]/[100%]"
        >
          Find password
        </Link>

        <button className="sm:py-6 py-4 px-24 bg-egyptianBlue text-white rounded-full mt-24 mx-auto flex items-center justify-center">
          Log in
        </button>
        <p className="mt-24 text-center text-base">
          I do not have an account!{" "}
          <Link href="/signup" className="underline underline-offset-4">
            Sign up
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default LoginForm;
