"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import PrimaryButton from "@/components/PrimaryButton";
import ShowLinks from "@/components/ShowLinks";
import PhImage from "@/public/assets/ph_image.svg";
import PhImageWhite from "@/public/assets/ph_image_white.svg";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

interface ProfileDetails {
  firstName: string;
  lastName: string;
  email: string | undefined;
  image: string | undefined;
}

const Profile = () => {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login");
    },
  });
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProfileDetails>({ mode: "onTouched" });

  const onsubmit: SubmitHandler<ProfileDetails> = async (data) => {
    console.log(data.email);
    try {
      setIsSaving(true);
      const response = await axios.post("/api/create-profile", {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        image: imageSrc,
      });
      console.log(response);
      toast.success(response.data.message);
      router.push("/links");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const [imageSrc, setImageSrc] = useState<string>("");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!session?.user?.id) return; // Wait until session is available

      try {
        const res = await fetch(
          `/api/create-profile?userId=${session.user.id}`
        );
        if (!res.ok) {
          console.error("No existing profile found.");
          return;
        }

        const profile = await res.json();
        console.log("Fetched profile:", profile);

        setValue("firstName", profile.firstName);
        setValue("lastName", profile.lastName);
        setValue("email", profile.email); // Just to be sure, even if email is readonly
        setImageSrc(profile.image);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    if (session?.user?.id) {
      fetchProfile();
    }
  }, [session, setValue]);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // if (event.target.files && event.target.files[0]) {
    //   setImageSrc(URL.createObjectURL(event.target.files[0]));
    //   setValue(
    //     "image",
    //     URL.createObjectURL(event.target.files[0]).split("blob:")[1]
    //   );
    // }
    if (!event.target.files) return;
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && typeof e.target.result === "string") {
        setImageSrc(e.target.result);
      }
    };
    reader.readAsDataURL(file);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "next_app_uploads");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        console.error("Upload failed:", response);
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      console.log("Cloudinary response:", data);

      setImageSrc(data.secure_url);

      return data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  return (
    <div>
      <Navbar />
      <div className="lg:mx-[1.67%] md:mx-[3.125%] mx-[4.3%]">
        <div className="w-full flexrow items-start gap-4">
          <ShowLinks />
          <div className="lg:w-[60%] md:mt-0 mt-4 w-full bg-white border border-transparent rounded-xl">
            <div className="md:p-10 p-6">
              <h2>Profile Details</h2>
              <p className="mt-2">
                Add your details to create a personal touch to your profile.
              </p>
              <div className="bg-light-grey mt-10 mb-6 border border-transparent rounded-xl p-5">
                <div className="w-full flex md:flex-row flex-col gap-4 md:items-center justify-between">
                  <p className="md:w-[35%] text-grey">Profile Picture</p>

                  <div className="w-[65%] flex md:flex-row flex-col md:items-center gap-3">
                    <div className="w-[193px] h-[193px]">
                      <input
                        type="file"
                        id="profile-image"
                        accept="image/jpg, image/jpeg, image/png"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <label
                        htmlFor="profile-image"
                        className={`flex justify-center items-center w-full h-full cursor-pointer border border-transparent rounded-xl ${
                          imageSrc === "" && "bg-light-purple"
                        }`}
                      >
                        {imageSrc !== "" ? (
                          <div className="relative w-full h-full overflow-hidden rounded-xl">
                            <Image
                              src={imageSrc}
                              alt="profile-image"
                              width={193}
                              height={193}
                              className="object-cover w-full h-full"
                            />
                            <div className="absolute top-0 left-0 bg-[rgba(0,0,0,0.5)] opacity-0 hover:opacity-100 z-10 w-full h-full flex justify-center items-center rounded-xl">
                              <div className="flex flex-col justify-center items-center space-y-2">
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
                          <div className="flex flex-col justify-center items-center space-y-2">
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
                    <span className="text-xs text-grey">
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
                  <div className="flex md:flex-row flex-col md:items-center justify-between gap-1">
                    <label className="text-grey md:text-base text-xs">
                      First Name*
                    </label>
                    <div className="md:w-[65%] w-full relative">
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
                      {errors.firstName && (
                        <span className="text-xs text-red absolute top-1/2 right-4 -translate-y-1/2">
                          Can&apos;t be empty
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex md:flex-row flex-col md:items-center justify-between gap-1">
                    <label className="text-grey md:text-base text-xs">
                      Last Name*
                    </label>
                    <div className="md:w-[65%] w-full relative">
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
                      {errors.lastName && (
                        <span className="text-xs text-red absolute top-1/2 right-4 -translate-y-1/2">
                          Can&apos;t be empty
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex md:flex-row flex-col md:items-center justify-between gap-1">
                    <label className="text-grey md:text-base text-xs">
                      Email
                    </label>
                    <div className="md:w-[65%] w-full">
                      <input
                        type="email"
                        {...register("email")}
                        defaultValue={session?.user?.email ?? ""}
                        className="border border-[#D9D9D9] rounded-lg bg-white py-3 px-4 focus:border-primary-purple focus:shadow-input w-full"
                        placeholder="email@example.com"
                        readOnly
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="py-6 pr-10 text-right border-t border-border">
              <PrimaryButton
                handleClick={handleSubmit(onsubmit)}
                className=""
                type="submit"
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save"}
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
