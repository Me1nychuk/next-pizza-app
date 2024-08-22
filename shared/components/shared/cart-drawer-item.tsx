import { cn } from "@/shared/lib/utils";
import React from "react";
import * as CartItem from "./cart-item-details";
import { CartItemDetailsProps } from "./cart-item-details/cart-item-details.types";
import { Trash2Icon } from "lucide-react";

interface CartDrawerItemProps extends CartItemDetailsProps {
  className?: string;
}
export const CartDrawerItem = ({
  className,
  imageUrl,
  details,
  name,
  price,
  quantity,
  disabled = false,
}: //   onClickCountButton,
//   onClickRemove,
CartDrawerItemProps) => {
  return (
    <>
      <div
        className={cn("flex bg-white p-5  gap-6", className, {
          "opacity-50 cursor-not-allowed pointer-events-none": disabled,
        })}
      >
        <CartItem.Image src={imageUrl} />
        <div className="flex-1">
          <CartItem.Info name={name} details={details} />

          <hr className="my-3"></hr>

          <div className="flex items-center justify-between">
            <CartItem.CountButton value={quantity} />
            <div className="flex items-center gap-3">
              <CartItem.Price value={price} />
              <Trash2Icon
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
                size={16}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
