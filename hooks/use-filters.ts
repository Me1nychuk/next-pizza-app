import { useSearchParams } from "next/navigation";
import React from "react";
import { useSet } from "react-use";

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

interface QueryFilters extends PriceProps {
  ingredients: string[];
  sizes: string[];
  pizzaTypes: string[];
}

export interface Filters {
  selectedIngredients: Set<string>;
  sizes: Set<string>;
  pizzaTypes: Set<string>;
  prices: PriceProps;
}

interface ReturnProps extends Filters {
  setPrice: (name: keyof PriceProps, newPrice: number) => void;
  setPrices: (newPrices: PriceProps) => void;
  setSelectedIngredients: (key: string) => void;
  setSizes: (key: string) => void;
  setPizzaTypes: (key: string) => void;
}
export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters,
    string
  >;

  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(searchParams.get("ingredients")?.split(",") || [])
  );

  const [prices, setPrices] = React.useState<PriceProps>({
    priceFrom: Number(searchParams.get("priceFrom")) || undefined,
    priceTo: Number(searchParams.get("priceTo")) || undefined,
  });
  const updatePrice = (name: keyof PriceProps, newPrice: number) => {
    setPrices((prevState) => ({
      ...prevState,
      [name]: newPrice,
    }));
  };

  const [sizes, { toggle: toggleSize }] = useSet(
    new Set<string>(searchParams.get("sizes")?.split(",") || [])
  );

  const [pizzaTypes, { toggle: toggleType }] = useSet(
    new Set<string>(searchParams.get("pizzaTypes")?.split(",") || [])
  );

  return {
    sizes,
    selectedIngredients,
    prices,
    pizzaTypes,
    setPrice: updatePrice,
    setPrices,
    setSelectedIngredients: toggleIngredients,
    setSizes: toggleSize,
    setPizzaTypes: toggleType,
  };
};
