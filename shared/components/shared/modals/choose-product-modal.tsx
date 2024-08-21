"use client";
import { Dialog } from "@/shared/components/ui";
import { DialogContent } from "@/shared/components/ui/dialog";
import { ChoosePizzaForm, ChooseProductForm } from "@/shared/components/shared";
import { cn } from "@/shared/lib/utils";
import React from "react";
import { useRouter } from "next/navigation";
import { IProduct } from "@/@types/prisma";

interface ChooseProductModalProps {
  className?: string;
  product: IProduct;
}
export const ChooseProductModal = ({
  className,
  product,
}: ChooseProductModalProps) => {
  const router = useRouter();
  const isPizzaForm = Boolean(product.items[0].pizzaType);
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
            />
          ) : (
            <ChooseProductForm
              imageUrl={product.imageUrl}
              name={product.name}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
