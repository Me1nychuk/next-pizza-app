"use client";
import { Dialog } from "@/shared/components/ui";
import { DialogContent } from "@/shared/components/ui/dialog";
import { ChoosePizzaForm, ChooseProductForm } from "@/shared/components/shared";
import { cn } from "@/shared/lib/utils";
import React from "react";
import { useRouter } from "next/navigation";
import { IProduct } from "@/@types/prisma";
import { useCartStore } from "@/shared/store/cart";
import toast from "react-hot-toast";

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

  const [addCartItem, loading] = useCartStore((state) => [
    state.addCartItem,
    state.loading,
  ]);

  const onSubmit = async (productId?: number, ingredients?: number[]) => {
    const productIdValue = productId ?? firstItem.id;
    try {
      await addCartItem({
        productItemId: productIdValue,
        ingredients,
      });

      toast.success(`"${product.name}" було додана до кошика.`);
      router.back();
    } catch (error) {
      console.error(error);
      toast.error("Товар не було додана до кошика.");
    }
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
              onClickAddCart={onSubmit}
              loading={loading}
            />
          ) : (
            <ChooseProductForm
              imageUrl={product.imageUrl}
              name={product.name}
              onClickAdd={onSubmit}
              price={firstItem.price}
              loading={loading}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
