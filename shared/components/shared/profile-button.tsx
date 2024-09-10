"use client";

import React from "react";
import { Button } from "../ui";
import { CircleUserRound, User } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface ProfileButtonProps {
  className?: string;
  onClickSignIn?: () => void;
}
export const ProfileButton = ({
  className,
  onClickSignIn,
}: ProfileButtonProps) => {
  const { data: session } = useSession();
  return (
    <div className={className}>
      {!session ? (
        <Button
          onClick={onClickSignIn}
          variant="outline"
          className="flex items-center gap-1"
        >
          <User size={16} /> Ввійти
        </Button>
      ) : (
        <Link href="/profile">
          <Button variant="outline" className="flex items-center gap-1">
            <CircleUserRound size={16} /> {session.user?.name || "Профіль"}
          </Button>
        </Link>
      )}
    </div>
  );
};
