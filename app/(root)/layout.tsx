import type { Metadata } from "next";

import { Header } from "@/components/shared";

export const metadata: Metadata = {
  title: "Next Pizza | Main",
  description: "MMMMMMMmmmmmmmm, tasty..",
};

export default function HomeLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <>
      <Header></Header>
      <main className="min-h-screen">
        {children}
        {modal}
      </main>
    </>
  );
}
