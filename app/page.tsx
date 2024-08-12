"use client";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import SecondaryButton from "@/components/SecondaryButton";
import AddNewLink from "@/public/assets/add new link image.svg";
import PrimaryButton from "@/components/PrimaryButton";

export default function Home() {
  return (
    <main className="">
      <Navbar />
      <div className="lg:mx-[1.67%] md:mx-[3.125%] mx-[4.3%]">
        <div className="w-full flex flex-row items-start space-x-4 space-y-0">
          <div className="lg:w-[40%] lg:block hidden bg-white border border-transparent rounded-xl">
            links
          </div>
          <div className="lg:w-[60%] w-full bg-white border border-transparent rounded-xl">
            <div className="p-10">
              <h2>Customize your links</h2>
              <p className="mt-2">
                Add/edit/remove links below and then share all your profiles
                with the world!
              </p>
              <div className="mt-10">
                <SecondaryButton
                  className="w-full"
                  handleClick={() => {}}
                  type="button"
                >
                  + Add new link
                </SecondaryButton>
              </div>
              <div className="bg-light-grey mt-6 flex flex-col justify-center items-center border border-transparent rounded-xl py-[3.90625rem] px-5">
                <Image src={AddNewLink} alt="" width={250} height={160} />
                <h2 className="mt-10">Let&rsquo;s get you started </h2>
                <p className="mt-4 text-center lg:w-[30.5rem] text-grey">
                  Use the “Add new link” button to get started. Once you have
                  more than one link, you can reorder and edit them. We’re here
                  to help you share your profiles with everyone!
                </p>
              </div>
            </div>
            <hr />
            <div className="py-6 pr-10 text-right">
              <PrimaryButton
                handleClick={() => {}}
                className=""
                type="submit"
                disabled=""
              >
                Save
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
