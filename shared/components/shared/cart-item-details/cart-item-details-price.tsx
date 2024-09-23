import { cn } from "@/shared/lib/utils";
import React from "react";

interface CartItemDetailsPriceProps {
  className?: string;
  value: number;
}
export const CartItemDetailsPrice = ({
  className,
  value,
}: CartItemDetailsPriceProps) => {
  return (
    <>
      <h2
        className={cn(
          className,
          "font-bold whitespace-nowrap max-sm:text-xs max-sm:w-[40px]"
        )}
      >
        {value} ₴
      </h2>
    </>
  );
};
