"use client";
import React from "react";
import { Button } from "../ui";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { CartDrawer } from "./cart-drawer";
import { useCartStore } from "@/shared/store/cart";

interface CartButtonProps {
  className?: string;
}
export const CartButton = ({ className }: CartButtonProps) => {
  const [totalAmount, loading, cartCount] = useCartStore((state) => [
    state.totalAmount,
    state.loading,
    state.items.length,
  ]);
  return (
    <>
      <CartDrawer>
        <Button
          loading={loading}
          className={cn("group relative", { "w-[105px]": loading }, className)}
        >
          <b>{(totalAmount || 0) + "₴"}</b>
          <span className="h-full w-[1px] bg-white/30 mx-3"></span>
          <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
            <ShoppingCart size={20} className="relative" strokeWidth={2} />
            <b>{cartCount}</b>
          </div>
          <ArrowRight
            size={20}
            className="absolute right-5 opacity-0 transition duration-300   -translate-x-2    group-hover:opacity-100 group-hover:translate-x-0"
          />
        </Button>
      </CartDrawer>
    </>
  );
};
