"use client";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { ReactNode } from "react";

type AuthProviderType = {
  children: ReactNode;
  session?: Session | null;
};

const AuthProvider = ({ session, children }: AuthProviderType) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default AuthProvider;
