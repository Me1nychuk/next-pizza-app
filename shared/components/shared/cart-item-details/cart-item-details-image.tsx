import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import React from "react";

interface CartItemDetailsImageProps {
  className?: string;
  src: string;
}
export const CartItemDetailsImage = ({
  src,
  className,
}: CartItemDetailsImageProps) => {
  return (
    <>
      <Image
        src={src}
        alt=""
        className={cn("w-[65px] h-[65px]", className)}
        width={65}
        height={65}
      />
    </>
  );
};
