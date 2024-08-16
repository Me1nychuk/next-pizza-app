import type { Metadata } from "next";

import { Header } from "@/components/shared";

export const metadata: Metadata = {
  title: "Next Pizza | Main",
  description: "MMMMMMMmmmmmmmm, tasty..",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header></Header>
      <main className="min-h-screen">{children}</main>
    </>
  );
}
