"use client";

import PrimaryButton from "@/components/PrimaryButton";
import LogoIcon from "@/public/assets/logo-icon.svg";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

interface AccountDetails {
  email: string;
  password: string;
  confirmPassword: string;
}

const CreateAccount = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<AccountDetails>({ mode: "onTouched" });

  const onsubmit: SubmitHandler<AccountDetails> = (data) => console.log(data);

  const createdPassword = watch("password");

  return (
    <div className="bg-light-grey  flex flex-col justify-center items-center">
      <div className="flex flex-row items-center gap-[7.5px]">
        <Image src={LogoIcon} alt="" width={32} height={32} />
        <h2 className="sm:block hidden">devlinks</h2>
      </div>
      <div className="bg-white p-10 rounded-xl mt-10 w-[476px]">
        <h2>Create Account</h2>
        <p className="text-grey">Let’s get you started sharing your links!</p>
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
                {...register("email", {
                  required: "Enter email",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email",
                  },
                })}
                placeholder="e.g. alex@email.com"
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
                  {typeof errors.email.message === "string" &&
                    errors.email.message}
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
                {...register("password", {
                  required: "Enter password",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                placeholder="At least 8 characters"
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
          <div>
            <label htmlFor="email" className="text-xs text-dark-grey">
              Confirm Password
            </label>
            <div className="mt-1 relative">
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Confirm password",
                  validate: (value) =>
                    value === createdPassword || "Passwords do not match",
                })}
                placeholder="At least 8 characters"
                className={`border ${
                  errors.confirmPassword
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
              {errors.confirmPassword && (
                <span className="text-xs text-red absolute top-1/2 right-4 -translate-y-1/2">
                  {typeof errors.confirmPassword.message === "string" &&
                    errors.confirmPassword.message}
                </span>
              )}
            </div>
          </div>
          <PrimaryButton
            className="w-full"
            type="submit"
            handleClick={() => {}}
            disabled={false}
          >
            Login
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
      </div>
    </div>
  );
};

export default CreateAccount;
