"use client";

import { cn } from "@/shared/lib/utils";
import React from "react";
import { Container } from "./container";
import Image from "next/image";
import Link from "next/link";
import {
  CartButton,
  ProfileButton,
  SearchInput,
} from "@/shared/components/shared";
import { AuthModal } from "./modals/auth-modal";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  className?: string;
  hasSearch?: boolean;
  hasCart?: boolean;
}

export const Header = ({
  className,
  hasSearch = true,
  hasCart = true,
}: Props) => {
  const [authModalOpen, setAuthModalOpen] = React.useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  React.useEffect(() => {
    if (searchParams.has("verified")) {
      router.replace("/");
      setTimeout(() => {
        toast.success("Ви підтвердили вашу пошту", {
          icon: "✅",
        });
      }, 500);
    }
  }, []);
  return (
    <header className={cn(" border-b ", className)}>
      <Container className="flex items-center justify-between py-8 ">
        {/* Left part */}
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="Logo" width={35} height={35}></Image>
            <div>
              <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
              <p className="text-base text-gray-400 leading-3">
                смачніше вже нікуди
              </p>
            </div>
          </div>
        </Link>

        {/* Center part */}

        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}
        {/* Right part */}
        <div className="flex items-center gap-3">
          <AuthModal
            open={authModalOpen}
            onClose={() => setAuthModalOpen(false)}
          />

          <ProfileButton onClickSignIn={() => setAuthModalOpen(true)} />
          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};
