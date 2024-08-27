"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import PrimaryButton from "@/components/PrimaryButton";
import ShowLinks from "@/components/ShowLinks";
import PhImage from "@/public/assets/ph_image.svg";
import PhImageWhite from "@/public/assets/ph_image_white.svg";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";

interface ProfileDetails {
  firstName: string;
  lastName: string;
  email: string;
}

const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileDetails>();

  // submit details
  const onsubmit: SubmitHandler<ProfileDetails> = (data) => console.log(data);

  const [imageSrc, setImageSrc] = useState<string>("");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImageSrc(URL.createObjectURL(event.target.files[0]));
      console.log(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="lg:mx-[1.67%] md:mx-[3.125%] mx-[4.3%]">
        <div className="w-full flexrow items-start space-x-4 space-y-0">
          <ShowLinks />
          <div className="lg:w-[60%] w-full bg-white border border-transparent rounded-xl">
            <div className="p-10">
              <h2>Profile Details</h2>
              <p className="mt-2">
                Add your details to create a personal touch to your profile.
              </p>
              <div className="bg-light-grey mt-10 mb-6 border border-transparent rounded-xl p-5">
                <div className="w-full flexrow items-center justify-between">
                  <p className="w-[35%] text-grey">Profile Picture</p>

                  <div className="w-[65%] flexrow items-center space-x-6">
                    <div className=" w-[193px] h-[193px]">
                      <input
                        type="file"
                        id="profile-image"
                        accept="image/jpg, image/jpeg, image/png"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <label
                        htmlFor="profile-image"
                        className={`flex justify-center items-center w-full ${
                          imageSrc === "" && "bg-light-purple"
                        }  h-full cursor-pointer border border-transparent rounded-xl`}
                      >
                        {imageSrc !== "" ? (
                          <div className="relative">
                            <Image
                              src={imageSrc}
                              alt="profile-image"
                              width={193}
                              height={193}
                              className="max-w-full h-full border border-transparent rounded-xl"
                            />
                            <div className="absolute top-0 left-0 bg-[rgba(0,0,0,0.5)] opacity-0 hover:opacity-100 z-10 border border-transparent rounded-xl w-full h-full flex justify-center items-center">
                              <div className="flexcol justify-center items-center space-y-2">
                                <Image
                                  src={PhImageWhite}
                                  alt=""
                                  width={32.5}
                                  height={27.5}
                                />
                                <p className="font-semibold text-white">
                                  + Upload Image
                                </p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flexcol justify-center items-center space-y-2">
                            <Image
                              src={PhImage}
                              alt=""
                              width={40}
                              height={40}
                            />
                            <p className="font-semibold text-primary-purple">
                              + Upload Image
                            </p>
                          </div>
                        )}
                      </label>
                    </div>
                    <span className="text-xs text-grey  ">
                      Image must be below 1024x1024px.
                      <br /> Use PNG or JPG format.
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-light-grey p-5">
                <form
                  onSubmit={handleSubmit(onsubmit)}
                  className="flex flex-col space-y-3"
                >
                  <div className="flexrow items-center justify-between">
                    <label htmlFor="firstName" className="">
                      First Name*
                    </label>
                    <div className="w-[65%] relative">
                      <input
                        type="text"
                        {...register("firstName", { required: true })}
                        aria-invalid={errors.firstName ? "true" : "false"}
                        id="firstName"
                        className={`border ${
                          errors.firstName
                            ? "border-red"
                            : "border-[#D9D9D9] focus:border-primary-purple focus:shadow-input"
                        } rounded-lg bg-white py-3 px-4  w-full`}
                        placeholder="e.g. John"
                      />
                      {errors.firstName?.type === "required" && (
                        <span className="text-xs text-red absolute top-1/2 right-4 -translate-y-1/2">
                          Can&apos;t be empty
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flexrow items-center justify-between">
                    <label htmlFor="">Last Name*</label>
                    <div className="w-[65%] relative">
                      <input
                        type="text"
                        {...register("lastName", { required: true })}
                        aria-invalid={errors.lastName ? "true" : "false"}
                        className={`border ${
                          errors.lastName
                            ? "border-red"
                            : "border-[#D9D9D9] focus:border-primary-purple focus:shadow-input"
                        }  rounded-lg bg-white py-3 px-4  w-full`}
                        placeholder="e.g. AppleSeed"
                      />
                      {errors.firstName?.type === "required" && (
                        <span className="text-xs text-red absolute top-1/2 right-4 -translate-y-1/2">
                          Can&apos;t be empty
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flexrow items-center justify-between">
                    <label htmlFor="">Email</label>
                    <div className="w-[65%]">
                      <input
                        type="email"
                        {...register("email")}
                        className="border border-[#D9D9D9] rounded-lg bg-white py-3 px-4 focus:border-primary-purple focus:shadow-input w-full"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <hr />
            <div className="py-6 pr-10 text-right">
              <PrimaryButton
                handleClick={handleSubmit(onsubmit)}
                className=""
                type="submit"
                disabled={false}
              >
                Save
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
