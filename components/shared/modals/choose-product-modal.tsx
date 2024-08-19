"use client";
import { Dialog } from "@/components/ui";
import { DialogContent } from "@/components/ui/dialog";
import { ChoosePizzaForm, ChooseProductForm, Title } from "@/components/shared";
import { cn } from "@/lib/utils";
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
              imageUrl={product.imageUrl}
              name={product.name}
              ingredients={[]}
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
