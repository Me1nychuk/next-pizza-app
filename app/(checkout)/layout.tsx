import { Container, Header } from "@/shared/components/shared";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Next Pizza - Cart",
  description: "Checkout page",
};
const CheckoutLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen bg-[#F4F1EE]">
      <Container>
        <Header
          className="border-b-gray-200"
          hasSearch={false}
          hasCart={false}
        />
        {children}
      </Container>
    </main>
  );
};

export default CheckoutLayout;
