"use client";
import { Dialog } from "@/shared/components/ui";
import { DialogContent } from "@/shared/components/ui/dialog";
import { ChoosePizzaForm, ChooseProductForm } from "@/shared/components/shared";
import { cn } from "@/shared/lib/utils";
import React from "react";
import { useRouter } from "next/navigation";
import { IProduct } from "@/@types/prisma";
import { useCartStore } from "@/shared/store/cart";

interface ChooseProductModalProps {
  className?: string;
  product: IProduct;
}
export const ChooseProductModal = ({
  className,
  product,
}: ChooseProductModalProps) => {
  const router = useRouter();
  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);

  const addCartItem = useCartStore((state) => state.addCartItem);

  const onClickAddProduct = () => {
    addCartItem({
      productItemId: firstItem.id,
    });
  };

  const onClickAddPizza = (productId: number, ingredients: number[]) => {
    addCartItem({
      productItemId: productId,
      ingredients,
    });
  };
  return (
    <>
      <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
        <DialogContent
          className={cn(
            "p-0 max-w-[1060px] w-[1060px] min-h-[500px] bg-white overflow-hidden",
            className
          )}
        >
          {isPizzaForm ? (
            <ChoosePizzaForm
              items={product.items}
              imageUrl={product.imageUrl}
              name={product.name}
              ingredients={product.ingredients}
              onClickAddCart={onClickAddPizza}
            />
          ) : (
            <ChooseProductForm
              imageUrl={product.imageUrl}
              name={product.name}
              onClickAdd={onClickAddProduct}
              price={firstItem.price}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
