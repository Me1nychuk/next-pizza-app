"use client";

import React from "react";
import { cn } from "@/shared/lib/utils";
import {
  GroupVariants,
  IngredientItem,
  PizzaImage,
  Title,
} from "@/shared/components/shared";
import { Button } from "@/shared/components/ui";
import { PizzaSize, PizzaType, pizzaTypes } from "@/shared/constants/pizza";
import { Ingredient, ProductItem } from "@prisma/client";
import { getPizzaDetails } from "@/shared/lib";
import { usePizzaOptions } from "@/shared/hooks";

interface ChoosePizzaFormProps {
  imageUrl: string;
  name: string;
  className?: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  onClickAddCart?: (productId: number, ingredients: number[]) => void;
}
export const ChoosePizzaForm = ({
  className,
  imageUrl,
  name,
  ingredients,
  items,
  onClickAddCart,
}: ChoosePizzaFormProps) => {
  const {
    size,
    type,
    availablePizzaSizes,
    selectedIngredients,
    setSize,
    setType,
    addIngredient,
    currentItemId,
  } = usePizzaOptions(items);

  const { totalPrice, productDetails } = getPizzaDetails(
    type,
    size,
    items,
    ingredients,
    selectedIngredients
  );

  const handleClick = () => {
    if (currentItemId) {
      onClickAddCart?.(currentItemId, Array.from(selectedIngredients));
    }
  };

  return (
    <>
      <div className={cn("flex flex-1", className)}>
        <PizzaImage src={imageUrl} alt={name} size={size} />

        <div className="w-[490px] bg-[#f5f4f4] p-7">
          <Title size="md" className="font-bold mb-1">
            {name}
          </Title>
          <p className="text-gray-400">{productDetails}</p>
          <div className="flex flex-col gap-4 mt-5 mb-4">
            <GroupVariants
              items={availablePizzaSizes}
              selectedValue={String(size)}
              onClick={(value) => setSize(Number(value) as PizzaSize)}
            />

            <GroupVariants
              items={pizzaTypes}
              selectedValue={String(type)}
              onClick={(value) => setType(Number(value) as PizzaType)}
            />
          </div>
          <div className=" bg-gray-50 p-1 rounded-md h-[420px] overflow-auto scrollbar">
            <div className="grid grid-cols-3 gap-3">
              {ingredients.map((ingredient, i) => (
                <IngredientItem
                  key={ingredient.id}
                  imageUrl={ingredient.imageUrl}
                  name={ingredient.name}
                  price={ingredient.price}
                  active={selectedIngredients.has(ingredient.id)}
                  onClick={() => addIngredient(ingredient.id)}
                />
              ))}
            </div>
          </div>

          <Button
            onClick={handleClick}
            className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
          >
            Додати до кошика за {totalPrice} ₴
          </Button>
        </div>
      </div>
    </>
  );
};
