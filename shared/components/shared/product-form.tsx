"use client";

import React from "react";
import { IProduct } from "@/@types/prisma";
import { useCartStore } from "@/shared/store/cart";
import toast from "react-hot-toast";
import { ChoosePizzaForm, ChooseProductForm } from "@/shared/components/shared";

interface ProductFormProps {
  className?: string;
  product: IProduct;
  onSubmit?: () => void;
}
export const ProductForm = ({
  className,
  product,
  onSubmit: _onSubmit,
}: ProductFormProps) => {
  const [addCartItem, loading] = useCartStore((state) => [
    state.addCartItem,
    state.loading,
  ]);

  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);

  const onSubmit = async (productId?: number, ingredients?: number[]) => {
    const productIdValue = productId ?? firstItem.id;
    try {
      await addCartItem({
        productItemId: productIdValue,
        ingredients,
      });

      toast.success(`"${product.name}" було додана до кошика.`);

      _onSubmit?.();
    } catch (error) {
      console.error(error);
      toast.error("Товар не було додана до кошика.");
    }
  };

  return (
    <>
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
    </>
  );
};
