"use client";

import LogoIcon from "@/public/assets/logo-icon.svg";
import Image from "next/image";
import LoginForm from "../ui/login-form";

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
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
