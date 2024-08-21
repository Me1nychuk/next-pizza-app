import React from "react";
import { PizzaSize, PizzaType } from "../constants/pizza";
import { getAvailablePizzaSizes } from "../lib";
import { useSet } from "react-use";
import { ProductItem } from "@prisma/client";
import { Variant } from "../components/shared/group-variants";

interface ReturnProps {
  size: PizzaSize;
  type: PizzaType;
  availablePizzaSizes: Variant[];
  selectedIngredients: Set<number>;
  setSize: (value: PizzaSize) => void;
  setType: (value: PizzaType) => void;
  addIngredient: (value: number) => void;
}
export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
  const [size, setSize] = React.useState<PizzaSize>(20);
  const [type, setType] = React.useState<PizzaType>(1);

  const [selectedIngredients, { toggle: addIngredient }] = useSet(
    new Set<number>([])
  );

  const availablePizzaSizes = getAvailablePizzaSizes(type, items);
  return {
    size,
    type,
    availablePizzaSizes,
    selectedIngredients,
    setSize,
    setType,
    addIngredient,
  };
};
