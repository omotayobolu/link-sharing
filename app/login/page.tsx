"use client";

import LogoIcon from "@/public/assets/logo-icon.svg";
import Image from "next/image";
import LoginForm from "../ui/login-form";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const Login = () => {
  const { status } = useSession();
  console.log(status);

  useEffect(() => {
    if (status === "authenticated") {
      redirect("/profile");
    }
  }, [status]);

  return (
    <div className="bg-light-grey h-screen flex flex-col sm:justify-center justify-start sm:items-center">
      <div className="flex flex-row items-center gap-[7.5px] sm:m-0 mt-8 mx-8">
        <Image src={LogoIcon} alt="" width={32} height={32} />
        <h2 className="text-2xl">devlinks</h2>
      </div>
      <div className="sm:bg-white sm:p-10 p-8 rounded-xl mt-10 sm:w-[476px]">
        <h2>Login</h2>
        <p className="text-grey">
          Add your details below to get back into the app
        </p>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
