"use client";

import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import { getLinks, getProfile } from "@/hooks/use-links";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ProtectedLayout from "../protected";
import { toast } from "sonner";

const Preview = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { data: links, isLoading: linksLoading } = getLinks(session?.user?.id);
  const { data: profile, isLoading: profileLoading } = getProfile(
    session?.user?.id
  );
  const [isCopied, setIsCopied] = useState(false);

  const shareableUrl = profile
    ? `${window.location.origin}/preview/${profile.id}`
    : "";

  const copyUrlToClipboard = () => {
    if (shareableUrl) {
      navigator.clipboard.writeText(shareableUrl);
      setIsCopied(true);
      toast.success("Link copied to clipboard!");

      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    }
  };

  const colors = ["bg-primary-black", "bg-primary-red", "bg-primary-blue"];

  useEffect(() => {
    if (!profileLoading && !profile) {
      router.push("/profile");
    }
  }, [profileLoading, profile, router]);

  useEffect(() => {
    if (!linksLoading && !links) {
      router.push("/links");
    }
  }, [linksLoading, links, router]);

  if (profileLoading || linksLoading || !profile || !links) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-white">
        <p className="text-lg text-dark-grey">Loading...</p>
      </div>
    );
  }

  return (
    <ProtectedLayout>
      <div className="min-h-screen w-full relative bg-white m-0">
        {profileLoading || linksLoading ? (
          <div className="w-full h-screen flex items-center justify-center">
            <p>Loading...</p>
          </div>
        ) : (
          <>
            <div className="h-[357px] w-full hidden lg:block absolute top-0 left-0 bg-primary-purple rounded-b-4xl"></div>
            <div className="lg:fixed relative z-10 top-0 left-0 right-0 p-6 max-w-[1700px] mx-auto">
              <div className="lg:py-4 lg:px-6 bg-white rounded-xl w-full flex flex-wrap gap-4 items-center justify-between">
                <div className="w-full sm:w-auto">
                  <SecondaryButton
                    handleClick={() => {
                      router.push("/links");
                    }}
                    type="button"
                    className="cursor-pointer w-full"
                  >
                    Back to Editor
                  </SecondaryButton>
                </div>
                <div className="w-full sm:w-auto">
                  {shareableUrl && (
                    <PrimaryButton
                      handleClick={() => {
                        copyUrlToClipboard();
                      }}
                      type="button"
                      className="cursor-pointer w-full"
                      disabled={false}
                    >
                      {isCopied ? "Copied!" : "Share Link"}
                    </PrimaryButton>
                  )}
                </div>
              </div>
            </div>
            <div className="lg:h-[250px]"></div>
            <div className="relative flex justify-center items-center">
              <div className="w-[349px] max-w-full rounded-3xl lg:bg-light-grey py-12 px-14 flexcol items-center justify-center">
                <Image
                  src={profile.image}
                  alt="Profile Image"
                  width={96}
                  height={96}
                  className="rounded-full border-4 border-primary-purple"
                />
                <div className="mt-6 flexcol items-center gap-2">
                  <p className="text-3xl text-dark-grey font-bold text-center">
                    {profile.firstName} {profile.lastName}
                  </p>
                  <p className="text-base text-grey">{profile.email}</p>
                </div>
                <div className="mt-14 flexcol gap-5">
                  {links.map((link: any, index: number) => (
                    <Link href={link.link} target="_blank" key={link.id}>
                      <button
                        className={`${
                          colors[index % colors.length]
                        } w-[237px] h-14 px-4.5 rounded-lg cursor-pointer hover:opacity-80`}
                      >
                        <div className="flexrow justify-between items-center">
                          <div className="flexrow items-center gap-2">
                            <Icon
                              icon={link.platform.icon}
                              width="20px"
                              height="20px"
                              className="text-white"
                            />
                            <p className="text-base text-white">
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
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </ProtectedLayout>
  );
};

export default Preview;
