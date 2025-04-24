"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { status } = useSession();
  console.log(status);

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/login");
    } else {
      redirect("/profile");
    }
  }, [status]);

  if (status === "loading") {
    return <div className="text-center">Loading...</div>;
  }

  return <div className="text-center">Redirecting</div>;
}
