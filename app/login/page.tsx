"use client";

import PrimaryButton from "@/components/PrimaryButton";
import LogoIcon from "@/public/assets/logo-icon.svg";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";

const Login = () => {
  return (
    <div className="bg-light-grey h-screen flex flex-col justify-center items-center">
      <div className="flex flex-row items-center gap-[7.5px]">
        <Image src={LogoIcon} alt="" width={32} height={32} />
        <h2 className="sm:block hidden">devlinks</h2>
      </div>
      <div className="bg-white p-10 rounded-xl mt-10 w-[476px]">
        <h2>Login</h2>
        <p className="text-grey">
          Add your details below to get back into the app
        </p>
        <form className="flex flex-col gap-6 mt-10">
          <div className="">
            <label htmlFor="email" className="text-xs text-dark-grey">
              Email Address
            </label>
            <div className="mt-1 relative">
              <input
                type="email"
                placeholder="e.g. alex@email.com"
                className="border border-border rounded-lg bg-white py-3 pl-11 pr-4 w-full focus:border-primary-purple focus:shadow-input"
              />
              <Icon
                icon="ph:envelope-simple-fill"
                width="16"
                height="16"
                className="text-grey absolute top-1/2 left-4 translate-y-[-50%]"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="text-xs text-dark-grey">
              Password
            </label>
            <div className="mt-1 relative">
              <input
                type="password"
                placeholder="Enter your password"
                className="border border-border rounded-lg bg-white py-3 pl-11 pr-4 w-full focus:border-primary-purple focus:shadow-input"
              />
              <Icon
                icon="ph:lock-key-fill"
                width="16"
                height="16"
                className="text-grey absolute top-1/2 left-4 translate-y-[-50%]"
              />
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
      </div>
    </div>
  );
};

export default Login;
