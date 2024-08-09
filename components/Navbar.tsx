"use client";
import Image from "next/image";
import Link from "next/link";
import LogoIcon from "@/public/assets/logo-icon.svg";
import { Icon } from "@iconify/react";
import SecondaryButton from "./SecondaryButton";

const Navbar = () => {
  return (
    <nav className="md:my-6 lg:mx-[2%] md:mx-[3.125%]">
      <div className="py-4 px-6 border border-transparent rounded-xl bg-white flexrow items-center justify-between">
        <div className="flexrow items-center gap-1.5">
          <Image src={LogoIcon} alt="Logo Icon" width={32} height={32} />
          <h2 className="sm:block hidden">devlinks</h2>
        </div>
        <div className="flexrow items-center sm:space-x-4">
          <Link
            href=""
            className="flexrow items-center space-x-2 py-[11px] px-[27px] bg-light-purple border border-transparent rounded-lg"
          >
            <Icon
              icon="ph:link-bold"
              width="1.25rem"
              height="1.25rem"
              className="text-primary-purple"
            />
            <p className="font-semibold text-primary-purple sm:block hidden">
              Links
            </p>
          </Link>
          <Link
            href=""
            className="flexrow items-center space-x-2  py-[11px] px-[27px]"
          >
            <Icon
              icon="ph:user-circle-bold"
              width="1.25rem"
              height="1.25rem"
              className="text-grey"
            />
            <p className="font-semibold text-grey sm:block hidden">
              Profile Details
            </p>
          </Link>
        </div>
        <SecondaryButton
          handleClick={() => {}}
          type="button"
          className="sm:block hidden"
        >
          Preview
        </SecondaryButton>
        <SecondaryButton
          handleClick={() => {}}
          type="button"
          className="sm:hidden block px-4 py-[11px]"
        >
          <Icon icon="ph:eye-bold" width="1.25rem" height="1.25rem" />
        </SecondaryButton>
      </div>
    </nav>
  );
};

export default Navbar;
