"use client";

import React from "react";

import * as Cart from "@/shared/components/shared/cart-item-details";
import { CartItemDetailsProps } from "./cart-item-details/cart-item-details.types";
import { cn } from "@/shared/lib/utils";
import { X } from "lucide-react";

interface CheckoutItemProps extends CartItemDetailsProps {
  className?: string;
  onClickCountButton?: (type: "plus" | "minus") => void;
  onClickRemove?: () => void;
}
export const CheckoutItem = ({
  id,
  className,
  imageUrl,
  details,
  name,
  price,
  quantity,
  disabled = false,
  onClickCountButton,
  onClickRemove,
}: CheckoutItemProps) => {
  return (
    <>
      <div
        className={cn(
          "flex items-center bg-white p-8 max-sm:p-1 gap-5 max-sm:gap-2 border-y border-y-neutral-100",
          className,
          {
            "opacity-50 cursor-not-allowed pointer-events-none": disabled,
          }
        )}
      >
        <Cart.Image src={imageUrl} />

        <div className=" flex-1 min-w-[100px]">
          <Cart.Info name={name} details={details} />
        </div>
        <Cart.Price value={price} />

        <Cart.CountButton value={quantity} onClick={onClickCountButton} />

        <X
          className="text-gray-400 hover:text-gray-600 cursor-pointer"
          size={16}
          onClick={onClickRemove}
        />
      </div>
    </>
  );
};
