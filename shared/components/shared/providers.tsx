"use client";

import React from "react";

import { SessionProvider } from "next-auth/react";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";

interface ProvidersProps {
  children?: React.ReactNode;
}
export const Providers = ({ children }: ProvidersProps) => {
  return (
    <>
      <SessionProvider>{children}</SessionProvider>
      <NextTopLoader />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};
