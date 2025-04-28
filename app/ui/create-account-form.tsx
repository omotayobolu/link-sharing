"use client";

import PrimaryButton from "@/components/PrimaryButton";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { createAccountSchema } from "@/lib/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

type CreateAccountFormType = z.infer<typeof createAccountSchema>;

export function CreateAccountForm() {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAccountFormType>({
    resolver: zodResolver(createAccountSchema),
    mode: "onTouched",
  });

  const onsubmit: SubmitHandler<CreateAccountFormType> = async (data) => {
    try {
      setIsCreating(true);
      const response = await axios.post("/api/register", {
        email: data.email,
        password: data.password,
      });
      console.log(response);
      toast.success(response.statusText);
      router.push("/login");
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error || "An error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
      setIsCreating(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onsubmit)}
      className="flex flex-col gap-6 mt-10"
    >
      <div className="">
        <label htmlFor="email" className="text-xs text-dark-grey">
          Email Address
        </label>
        <div className="mt-1 relative">
          <input
            type="email"
            id="email"
            placeholder="e.g. alex@email.com"
            {...register("email")}
            className={`border ${
              errors.email
                ? "border-red"
                : "border-border focus:border-primary-purple focus:shadow-input"
            } text-dark-grey rounded-lg bg-white py-3 pl-11 pr-4 w-full`}
          />
          <Icon
            icon="ph:envelope-simple-fill"
            width="16"
            height="16"
            className="text-grey absolute top-1/2 left-4 translate-y-[-50%]"
          />
          {errors.email && (
            <span className="text-xs text-red absolute top-1/2 right-4 -translate-y-1/2">
              {errors.email?.message}
            </span>
          )}
        </div>
      </div>
      <div>
        <label htmlFor="email" className="text-xs text-dark-grey">
          Create Password
        </label>
        <div className="mt-1 relative">
          <input
            type="password"
            id="password"
            placeholder="At least 8 characters"
            {...register("password")}
            className={`border ${
              errors?.password
                ? "border-red"
                : "border-border focus:border-primary-purple focus:shadow-input"
            } text-dark-grey rounded-lg bg-white py-3 pl-11 pr-4 w-full`}
          />
          <Icon
            icon="ph:lock-key-fill"
            width="16"
            height="16"
            className="text-grey absolute top-1/2 left-4 translate-y-[-50%]"
          />
          {errors?.password && (
            <span className="text-xs text-red absolute top-1/2 right-4 -translate-y-1/2">
              {errors?.password?.message}
            </span>
          )}
        </div>
      </div>
      <div>
        <label htmlFor="email" className="text-xs text-dark-grey">
          Confirm Password
        </label>
        <div className="mt-1 relative">
          <input
            type="password"
            id="confirmPassword"
            placeholder="At least 8 characters"
            {...register("confirmPassword")}
            className={`border ${
              errors?.confirmPassword
                ? "border-red"
                : "border-border focus:border-primary-purple focus:shadow-input"
            } text-dark-grey rounded-lg bg-white py-3 pl-11 pr-4 w-full`}
          />
          <Icon
            icon="ph:lock-key-fill"
            width="16"
            height="16"
            className="text-grey absolute top-1/2 left-4 translate-y-[-50%]"
          />
          {errors?.confirmPassword && (
            <span className="text-xs text-red absolute top-1/2 right-4 -translate-y-1/2">
              {errors.confirmPassword?.message}
            </span>
          )}
        </div>
      </div>
      <PrimaryButton
        className="w-full"
        type="submit"
        handleClick={() => {}}
        disabled={isCreating}
      >
        {isCreating ? "Creating account..." : "Create new account"}
      </PrimaryButton>
      <div className="">
        <p className="text-grey text-center">
          Already have an account?
          <Link href="/login">
            <span className="text-base text-primary-purple"> Login</span>
          </Link>
        </p>
      </div>
    </form>
  );
}
