"use client";
import { Eye } from "lucide-react";
import { FormField, FormItem, FormControl, FormMessage } from "./ui/form";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { EyeClosedIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

const PasswordInput = ({
  form,
  name,
  className,
}: {
  form: any;
  name: string;
  className?: string;
}) => {
  const t = useTranslations("loginPage");
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem
            className={cn(
              "flex flex-col items-center relative mt-12",
              className
            )}
          >
            <label htmlFor={field.name} className="sr-only">
              {name === "password" ? t("password") : t("confirmPassword")}
            </label>
            <FormControl>
              <input
                type={showPassword ? "text" : "password"}
                className="bg-transparent placeholder:text-formText pb-4 border-b-[0.5px] border-formText text-formText appearance-none focus:outline-none w-full text-base"
                placeholder={
                  name === "password"
                    ? t("password") + "*"
                    : t("confirmPassword") + "*"
                }
                {...field}
              />
            </FormControl>
            <FormMessage />
            <button
              type="button"
              className="absolute right-0"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeClosedIcon className="size-6" />
              ) : (
                <Eye className="size-6" />
              )}
            </button>
          </FormItem>
        )}
      />
    </>
  );
};

export default PasswordInput;
