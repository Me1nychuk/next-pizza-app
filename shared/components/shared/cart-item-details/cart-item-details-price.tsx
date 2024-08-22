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
      <h2 className={cn(className, "font-bold")}>{value} ₴</h2>
    </>
  );
};
