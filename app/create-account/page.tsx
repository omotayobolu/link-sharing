import LogoIcon from "@/public/assets/logo-icon.svg";
import Image from "next/image";
import { CreateAccountForm } from "../ui/create-account-form";

const CreateAccount = () => {
  return (
    <div className="bg-light-grey h-screen flex flex-col justify-center items-center">
      <div className="flex flex-row items-center gap-[7.5px]">
        <Image src={LogoIcon} alt="" width={32} height={32} />
        <h2 className="sm:block hidden">devlinks</h2>
      </div>
      <div className="bg-white p-10 rounded-xl mt-10 w-[476px]">
        <h2>Create Account</h2>
        <p className="text-grey">Let’s get you started sharing your links!</p>
        <CreateAccountForm />
      </div>
    </div>
  );
};

export default CreateAccount;
