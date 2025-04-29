"use client";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import LogoIcon from "@/public/assets/logo-icon.svg";
import { Icon } from "@iconify/react";
import SecondaryButton from "./SecondaryButton";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="md:my-6 lg:mx-[2%] md:mx-[3.125%]">
      <div className="py-4 px-6 border border-transparent rounded-xl bg-white flexrow items-center justify-between gap-2">
        <Link href="/">
          <div className="flexrow items-center gap-1.5">
            <Image
              src={LogoIcon}
              alt="Logo Icon"
              width={32}
              height={32}
              className="flex-shrink-0"
            />
            <h2 className="sm:block hidden">devlinks</h2>
          </div>
        </Link>
        <div className="flexrow items-center sm:gap-4">
          <Link
            href="/links"
            className={`flexrow items-center gap-2  md:py-[11px] py-2 md:px-[27px] px-5 ${
              pathname === "/links"
                ? "bg-light-purple border border-transparent rounded-lg"
                : ""
            }`}
          >
            <Icon
              icon="ph:link-bold"
              width="1.25rem"
              height="1.25rem"
              className={`${
                pathname === "/links" ? "text-primary-purple" : "text-grey"
              } `}
            />
            <p
              className={`font-semibold ${
                pathname === "/links" ? "text-primary-purple" : "text-grey"
              } sm:block hidden`}
            >
              Links
            </p>
          </Link>
          <Link
            href="/profile"
            className={`flexrow items-center gap-2  md:py-[11px] py-2 md:px-[27px] px-5 ${
              pathname === "/profile"
                ? "bg-light-purple border border-transparent rounded-lg"
                : "hover:text-primary-purple"
            }`}
          >
            <Icon
              icon="ph:user-circle-bold"
              width="1.25rem"
              height="1.25rem"
              className={`${
                pathname === "/profile" ? "text-primary-purple" : "text-grey"
              }`}
            />
            <p
              className={`font-semibold ${
                pathname === "/profile" ? "text-primary-purple" : "text-grey"
              } sm:block hidden`}
            >
              Profile Details
            </p>
          </Link>
        </div>
        <SecondaryButton
          handleClick={() => {
            router.push("/preview");
          }}
          type="button"
          className="sm:block hidden cursor-pointer"
        >
          Preview
        </SecondaryButton>
        <button
          onClick={() => {
            router.push("/preview");
          }}
          type="button"
          className="sm:hidden block md:px-4 md:py-[11px] p-2 border border-primary-purple rounded-lg text-primary-purple"
        >
          <Icon icon="ph:eye-bold" width="1.25rem" height="1.25rem" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
