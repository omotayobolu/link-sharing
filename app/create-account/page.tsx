import LogoIcon from "@/public/assets/logo-icon.svg";
import Image from "next/image";
import { CreateAccountForm } from "../ui/create-account-form";

const CreateAccount = () => {
  return (
    <div className="bg-light-grey h-screen flex flex-col sm:justify-center justify-start sm:items-center">
      <div className="flex flex-row items-center gap-[7.5px] sm:m-0 mt-8 mx-8">
        <Image src={LogoIcon} alt="" width={32} height={32} />
        <h2 className="text-2xl">devlinks</h2>
      </div>
      <div className="sm:bg-white sm:p-10 p-8 rounded-xl mt-10 sm:w-[476px]">
        <h2>Create Account</h2>
        <p className="text-grey">Let’s get you started sharing your links!</p>
        <CreateAccountForm />
      </div>
    </div>
  );
};

export default CreateAccount;
