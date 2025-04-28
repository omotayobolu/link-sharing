import PrimaryButton from "@/components/PrimaryButton";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginSchema } from "@/lib/zod";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type LoginFormType = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const router = useRouter();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const onsubmit: SubmitHandler<LoginFormType> = async (data) => {
    setIsLoggingIn(true);

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      console.log("Auth error:", result);
      if (!result?.error) {
        toast.success("Login successful");
        router.push("/profile");
      } else {
        toast.error(result.code);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoggingIn(false);
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
          Password
        </label>
        <div className="mt-1 relative">
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            {...register("password")}
            className={`border ${
              errors.password
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
          {errors.password && (
            <span className="text-xs text-red absolute top-1/2 right-4 -translate-y-1/2">
              {typeof errors.password.message === "string" &&
                errors.password.message}
            </span>
          )}
        </div>
      </div>
      <PrimaryButton
        className="w-full "
        type="submit"
        handleClick={() => {
          // handleSubmit(onsubmit);
        }}
        disabled={isLoggingIn}
      >
        {isLoggingIn ? "Logging in..." : "Login"}
      </PrimaryButton>
      <div className="">
        <p className="text-grey text-center">
          Don&apos;t have an account?
          <Link href="/create-account">
            <span className="text-base text-primary-purple">
              {" "}
              Create account
            </span>
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
