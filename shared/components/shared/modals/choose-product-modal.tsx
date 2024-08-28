"use client";
import { Dialog } from "@/shared/components/ui";
import { DialogContent } from "@/shared/components/ui/dialog";
import { ProductForm } from "@/shared/components/shared";
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

  return (
    <>
      <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
        <DialogContent
          className={cn(
            "p-0 max-w-[1060px] w-[1060px] min-h-[500px] bg-white overflow-hidden",
            className
          )}
        >
          <ProductForm product={product} onSubmit={() => router.back()} />
        </DialogContent>
      </Dialog>
    </>
  );
};
