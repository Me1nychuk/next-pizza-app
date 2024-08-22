"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import { Button } from "../ui";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { CartDrawerItem } from "./cart-drawer-item";
import { getCartItemDetails } from "@/shared/lib";

interface CartDrawerProps {
  className?: string;
  children?: React.ReactNode;
}
export const CartDrawer = ({ children, className }: CartDrawerProps) => {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="w-[400px] flex flex-col justify-between pb-0 bg-[#F4F1EE]">
          <SheetHeader>
            <SheetTitle className="text-xl ">
              В кошику <span className="font-bold">{`${3} товари`}</span>
            </SheetTitle>
          </SheetHeader>

          <div className="flex flex-col gap-2 -mx-6 overflow-y-auto my-5  flex-1">
            <CartDrawerItem
              id={122}
              imageUrl="https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp"
              details={getCartItemDetails(2, 30, [])}
              name="Пепероні фреш"
              price={520}
              quantity={3}
            />
          </div>

          <SheetFooter className="-mx-6 bg-white p-8 ">
            <div className="w-full">
              <div className="flex   mb-5 items-center">
                <span className="flex flex-1 text-lg text-neutral-800">
                  Всього:
                  <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                </span>
                <span className="font-bold text-xl">520₴</span>
              </div>
              <Link href="/cart">
                <Button className="w-full font-bold h-14">
                  Оформити замовлення <ArrowRight size={16} className="ml-3" />
                </Button>
              </Link>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};
