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
import { useCartStore } from "@/shared/store/cart";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";

interface CartDrawerProps {
  className?: string;
  children?: React.ReactNode;
}
export const CartDrawer = ({ children, className }: CartDrawerProps) => {
  const [
    totalAmount,
    items,
    fetchCartItems,
    updateItemsQuantity,
    deleteCartItem,
  ] = useCartStore((state) => [
    state.totalAmount,
    state.items,
    state.fetchCartItems,
    state.updateItemsQuantity,
    state.deleteCartItem,
  ]);

  React.useEffect(() => {
    fetchCartItems();
  }, []);

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    updateItemsQuantity(id, type === "plus" ? quantity + 1 : quantity - 1);
  };

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="w-[400px] flex flex-col justify-between pb-0 bg-[#F4F1EE]">
          <SheetHeader>
            <SheetTitle className="text-xl ">
              В кошику
              <span className="font-bold ml-1">{`${items.length} товари`}</span>
            </SheetTitle>
          </SheetHeader>

          <div className="flex flex-col gap-2 -mx-6 overflow-y-auto my-5  flex-1">
            {items.map((item) => (
              <CartDrawerItem
                key={item.id}
                id={item.id}
                imageUrl={item.imageUrl}
                details={
                  item.pizzaSize && item.pizzaType
                    ? getCartItemDetails(
                        item.ingredients,
                        item.pizzaType as PizzaType,
                        item.pizzaSize as PizzaSize
                      )
                    : ""
                }
                disabled={item.disabled}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                onClickCountButton={(type) =>
                  onClickCountButton(item.id, item.quantity, type)
                }
                onClickRemove={() => deleteCartItem(item.id)}
              />
            ))}
          </div>

          <SheetFooter className="-mx-6 bg-white p-8 ">
            <div className="w-full">
              <div className="flex   mb-5 items-center">
                <span className="flex flex-1 text-lg text-neutral-800">
                  Всього:
                  <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                </span>
                <span className="font-bold text-xl">{totalAmount}₴</span>
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
