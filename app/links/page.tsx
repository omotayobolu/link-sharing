"use client";

import Navbar from "@/components/Navbar";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import Image from "next/image";
import ShowLinks from "@/components/ShowLinks";
import AddNewLink from "@/public/assets/add new link image.svg";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { Icon } from "@iconify/react/dist/iconify.js";
import { FormSelect } from "@/components/custom-select";
import { useEffect, useState } from "react";
import axios from "axios";
import { getLinks } from "@/hooks/use-links";
import { QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Option } from "@/components/custom-select";

const Links = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login");
    },
  });

  const queryClient = new QueryClient();

  const { data: links = [], isLoading } = getLinks(session?.user?.id);

  const platformOptions = [
    {
      id: "github",
      value: "Github",
      icon: "mingcute:github-fill",
    },
    {
      id: "youtube",
      value: "YouTube",
      icon: "mdi:youtube",
    },
    {
      id: "linkedin",
      value: "LinkedIn",
      icon: "mdi:linkedin",
    },
    {
      id: "facebook",
      value: "Facebook",
      icon: "ic:baseline-facebook",
    },
    {
      id: "frontendmentor",
      value: "Frontend Mentor",
      icon: "simple-icons:frontendmentor",
    },
    {
      id: "x",
      value: "X (formerly Twitter)",
      icon: "line-md:twitter-x",
    },
    {
      id: "stackoverflow",
      value: "Stack Overflow",
      icon: "cib:stackoverflow",
    },
    {
      id: "website",
      value: "Personal Website",
      icon: "mdi:web",
    },
  ];

  const [noLinks, setNoLinks] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<{ links: { dbId?: string; platform: Option; link: string }[] }>({
    mode: "onTouched",
    defaultValues: {
      links: [{ platform: { id: "", value: "", icon: "" }, link: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "links",
  });

  const addNewLink = () => {
    append({
      platform: {
        id: "",
        value: "",
        icon: "",
      },
      link: "",
    });
    setNoLinks(false);
  };

  const removeLink = async (index: number, dbId?: string) => {
    if (fields.length <= 1) {
      setNoLinks(true);
    }
    if (dbId) {
      try {
        const response = await axios.delete(
          `/api/links?linkId=${dbId}&userId=${session?.user?.id}`,
          {
            data: {
              linkId: dbId,
              userId: session?.user?.id,
            },
          }
        );
        remove(index);
        queryClient.invalidateQueries({
          queryKey: ["links", session?.user?.id],
        });
        toast.success(response.data.message);
        console.log(response);
      } catch (error) {
        console.error("Error removing link", error);
      }
    } else {
      remove(index);
    }
  };

  const onsubmit = async (data: any) => {
    try {
      setIsSaving(true);
      const response = await axios.post("/api/links", {
        userId: session?.user?.id,
        links: data.links,
      });
      await queryClient.invalidateQueries({
        queryKey: ["links", session?.user?.id],
        refetchType: "active",
      });

      toast.success(response.data.message);
    } catch (error) {
      console.error("Error saving links", error);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (!links || links.length === 0) {
      setNoLinks(true);
      reset({ links: [] });
      return;
    }

    setNoLinks(false);

    reset(
      {
        links: links.map(
          (link: {
            id: string;
            platform: Option;
            link: string;
          }): { dbId?: string; platform: Option; link: string } => ({
            dbId: link.id,
            platform: link.platform,
            link: link.link,
          })
        ),
      },
      { keepDefaultValues: false, keepValues: false }
    );
  }, [links, reset]);

  return (
    <main className="">
      <Navbar />
      <div className="lg:mx-[1.67%] md:mx-[3.125%] mx-[4.3%]">
        <div className="w-full flex flex-row items-start space-x-4 space-y-0">
          <ShowLinks />
          <div className="lg:w-[60%] w-full bg-white border border-transparent rounded-xl">
            <div className="p-10">
              <h2>Customize your links</h2>
              <p className="mt-2">
                Add/edit/remove links below and then share all your profiles
                with the world!
              </p>
              <div className="mt-10">
                <SecondaryButton
                  className="w-full cursor-pointer"
                  handleClick={() => {
                    addNewLink();
                  }}
                  type="button"
                >
                  + Add new link
                </SecondaryButton>
              </div>
              <div className="mt-6">
                {isLoading ? (
                  <p className="text-center">Loading...</p>
                ) : noLinks ? (
                  <div className="bg-light-grey flex flex-col justify-center items-center border border-transparent rounded-xl py-[3.90625rem] px-5">
                    <Image src={AddNewLink} alt="" width={250} height={160} />
                    <h2 className="mt-10">Let&rsquo;s get you started </h2>
                    <p className="mt-4 text-center lg:w-[30.5rem] text-grey">
                      Use the “Add new link” button to get started. Once you
                      have more than one link, you can reorder and edit them.
                      We’re here to help you share your profiles with everyone!
                    </p>
                  </div>
                ) : (
                  <form>
                    {fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="bg-light-grey p-5 mb-6 rounded-xl"
                      >
                        <div className="flex flex-row items-center justify-between">
                          <div className="flexrow items-center gap-2">
                            <Icon
                              icon="material-symbols-light:equal"
                              color="#737373"
                              width="24"
                              height="24"
                            />
                            <p className="font-bold text-grey">
                              Link #{index + 1}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              removeLink(index, field.dbId);
                            }}
                            className="text-grey cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>

                        <div className="mt-3">
                          <label
                            htmlFor={`links.${index}.platform`}
                            className="text-dark-grey text-xs"
                          >
                            Platform
                          </label>
                          <FormSelect
                            name={`links.${index}.platform`}
                            control={control}
                            options={platformOptions}
                            placeholder="Select a platform"
                            className="w-full"
                            rules={{ required: "Select a platform" }}
                          />
                        </div>
                        <div className="mt-3">
                          <label
                            htmlFor={`link-${index}`}
                            className="text-dark-grey text-xs"
                          >
                            Link
                          </label>
                          <div className="relative mt-1">
                            <input
                              type="text"
                              id={`link-${index}`}
                              placeholder="https://github.com/username"
                              {...register(`links.${index}.link`, {
                                required: "Can't be empty",
                              })}
                              className={`border ${
                                errors.links?.[index]?.link
                                  ? "border-red"
                                  : "border-border focus:border-primary-purple focus:shadow-input"
                              } text-dark-grey rounded-lg bg-white py-3 pl-11 pr-4 w-full`}
                            />
                            <Icon
                              icon="ph:link-bold"
                              width="16px"
                              height="16px"
                              className="text-grey absolute top-1/2 left-4 translate-y-[-50%]"
                            />
                            {errors.links?.[index]?.link && (
                              <span className="text-xs text-red absolute top-1/2 right-4 -translate-y-1/2">
                                {errors.links?.[index]?.link.message}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </form>
                )}
              </div>
            </div>

            <div className="py-6 pr-10 text-right border-t border-border">
              <PrimaryButton
                handleClick={handleSubmit(onsubmit)}
                className=""
                type="submit"
                disabled={noLinks || isSaving}
              >
                {isSaving ? "Saving..." : "Save"}
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Links;
