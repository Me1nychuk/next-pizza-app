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
import {
  mapPizzaType,
  PizzaSize,
  pizzaSizes,
  PizzaType,
  pizzaTypes,
} from "@/shared/constants/pizza";
import { Ingredient, ProductItem } from "@prisma/client";
import { useSet } from "react-use";

interface ChoosePizzaFormProps {
  imageUrl: string;
  name: string;
  className?: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  onClickAddCart?: VoidFunction;
}
export const ChoosePizzaForm = ({
  className,
  imageUrl,
  name,
  ingredients,
  items,
  onClickAddCart,
}: ChoosePizzaFormProps) => {
  const [size, setSize] = React.useState<PizzaSize>(20);
  const [type, setType] = React.useState<PizzaType>(1);

  const [selectedIngredients, { toggle: addIngredient }] = useSet(
    new Set<number>([])
  );

  const pizzaPrice =
    items.find((item) => item.pizzaType === type && item.size === size)
      ?.price || 0;
  const totalIngredientsPrice = ingredients
    .filter((item) => selectedIngredients.has(item.id))
    .reduce((acc, item) => acc + item.price, 0);

  const totalPrice = pizzaPrice + totalIngredientsPrice;

  const productDetails = `${size} см, ${mapPizzaType[type]} тісто${
    selectedIngredients.size > 0
      ? `, доп. інгредієнти(${selectedIngredients.size})`
      : ""
  } `;

  const availablePizzas = items.filter((item) => item.pizzaType === type);
  const availablePizzaSize = pizzaSizes.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !availablePizzas.some(
      (pizza) => Number(pizza.size) === Number(item.value)
    ),
  }));

  const handleClick = () => {
    onClickAddCart?.();
    console.log({
      type,
      size,
      ingredients: selectedIngredients,
      price: totalPrice,
    });
  };

  React.useEffect(() => {
    const isAvailableSize = availablePizzaSize?.find(
      (item) => Number(item.value) === size && !item.disabled
    );
    const availableSize = availablePizzaSize?.find((item) => !item.disabled);
    if (!isAvailableSize && availableSize) {
      setSize(Number(availableSize.value) as PizzaSize);
    }
  }, [type]);
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
              items={availablePizzaSize}
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
            disabled={pizzaPrice === 0}
          >
            {pizzaPrice > 0
              ? `Додати до кошика за ${totalPrice} ₴`
              : "Немає в наявності"}
          </Button>
        </div>
      </div>
    </>
  );
};
