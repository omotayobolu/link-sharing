"use client";

import { getLinks, getProfile } from "@/hooks/use-links";
import { Icon } from "@iconify/react/dist/iconify.js";
import { link } from "fs";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Showlinks = () => {
  const { data: session } = useSession();
  const { data: links, isLoading: linksLoading } = getLinks(session?.user?.id);
  const { data: profile, isLoading: profileLoading } = getProfile(
    session?.user?.id
  );

  console.log(profile, "profile");
  console.log(links, "links");

  const hasLinks = links && links.length > 0;

  const colors = ["bg-primary-black", "bg-primary-red", "bg-primary-blue"];

  return (
    <div className="lg:w-[40%] lg:flex items-center justify-center hidden bg-white border border-transparent rounded-xl h-[834px]">
      <div className="relative w-[307px] h-[631px] border border-grey rounded-[4rem] py-2.5 px-[11px]">
        <div className="w-[285px] h-[611px] scrollbar-hide overflow-y-auto border border-grey rounded-[3.4rem] flex flex-col items-center justify-center pb-10">
          <div className="absolute top-2.5 left-1/4 right-1/4 w-1/2 h-6 border-t-0 border border-grey bg-white rounded-b-2xl"></div>
          <div className="mt-24">
            {profile && !profileLoading ? (
              <div className="relative w-[96px] h-[96px]">
                <Image
                  src={profile.image}
                  alt="Profile Image"
                  width={96}
                  height={96}
                  className="rounded-full w-[96px] h-[96px] object-cover border-4 border-primary-purple flex-shrink-0"
                />
              </div>
            ) : (
              <div className="h-24 w-24 rounded-full bg-default"></div>
            )}
          </div>
          <div className="mt-6 flex flex-col items-center gap-3.5">
            <div className="">
              {profile && !profileLoading ? (
                <p className="text-lg text-dark-grey font-semibold">
                  {profile.firstName} {profile.lastName}
                </p>
              ) : (
                <div className="w-40 h-4 bg-default rounded-[6.5rem]"></div>
              )}
            </div>
            <div className="">
              {profile && !profileLoading ? (
                <p className="text-sm text-grey">{profile.email}</p>
              ) : (
                <div className="w-18 h-2 bg-default rounded-[6.5rem]"></div>
              )}
            </div>
          </div>
          <div className="mt-14 flex flex-col gap-5">
            {hasLinks && !linksLoading ? (
              <>
                {links.map((link: any, index: number) => (
                  <Link href={link.link} target="_blank" key={link.id}>
                    <button
                      className={`${
                        colors[index % colors.length]
                      } w-[237px] h-11 rounded-lg px-4 cursor-pointer hover:opacity-80`}
                    >
                      <div className="flexrow justify-between items-center">
                        <div className="flexrow items-center gap-2">
                          <Icon
                            icon={link.platform.icon}
                            width="16px"
                            height="16px"
                            className="text-white"
                          />
                          <p className="text-xs text-white">
                            {link.platform.value}
                          </p>
                        </div>
                        <Icon
                          icon="tdesign:arrow-right"
                          width="16px"
                          height="16px"
                          className="text-white"
                        />
                      </div>
                    </button>
                  </Link>
                ))}
                {Array.from({ length: 4 - links.length }).map((_, idx) => (
                  <button
                    key={`default-${idx}`}
                    className="bg-default w-[237px] h-11 rounded-lg"
                  ></button>
                ))}
              </>
            ) : (
              Array.from({ length: 4 }).map((_, idx) => (
                <button
                  key={idx}
                  className="bg-default w-[237px] h-11 rounded-lg"
                ></button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Showlinks;
