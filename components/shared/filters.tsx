"use client";

import React from "react";
import {
  CheckboxFiltersGroup,
  FilterCheckBox,
  RangeSlider,
  Title,
} from "@/components/shared";
import { Input } from "../ui";
import { useFilterIngredients } from "@/hooks/useFilterIngredients";
import { useSet } from "react-use";

interface Props {
  className?: string;
}
interface PriceProps {
  priceFrom: number;
  priceTo: number;
}

export const Filters = ({ className }: Props) => {
  const {
    ingredients: basicIngredients,
    loading: loadingIngredients,
    selectedIngredients,
    onToggleId,
  } = useFilterIngredients();

  const [price, setPrice] = React.useState<PriceProps>({
    priceFrom: 0,
    priceTo: 1500,
  });

  const [sizes, { toggle: toggleSize }] = useSet(new Set<string>([]));
  const [pizzaTypes, { toggle: toggleType }] = useSet(new Set<string>([]));

  const ingredients = basicIngredients.map((ingredient) => ({
    text: ingredient.name,
    value: String(ingredient.id),
  }));

  const updatePrice = (name: keyof PriceProps, newPrice: number) => {
    setPrice((prevState) => ({
      ...prevState,
      [name]: newPrice,
    }));
  };

  React.useEffect(() => {
    console.log(sizes, price, selectedIngredients, pizzaTypes);
  }, [sizes, price, selectedIngredients, pizzaTypes]);
  return (
    <>
      <div className={className}>
        <Title className="font-bold mb-5">Фільтрація</Title>
        {/* top checkboxes */}

        <CheckboxFiltersGroup
          className="mb-5"
          title="Розміри"
          items={[
            { text: "20 см", value: "20" },
            { text: "30 см", value: "30" },
            { text: "40 см", value: "40" },
          ]}
          selected={sizes}
          onClickCheckbox={toggleSize}
          name="sizes"
        />

        {/* Price filter */}
        <div className="mt-6 border-y border-y-neutral-100 pt-6 pb-7">
          <p className="text-base font-bold mb-3">Ціна від і до:</p>
          <div className="flex gap-3 mb-5">
            <Input
              type="number"
              placeholder="0"
              min={0}
              max={1500}
              value={String(price.priceFrom)}
              onChange={(e) => updatePrice("priceFrom", Number(e.target.value))}
              step={10}
            />
            <Input
              type="number"
              placeholder="0"
              min={0}
              max={1500}
              value={String(price.priceTo)}
              onChange={(e) => updatePrice("priceTo", Number(e.target.value))}
              step={10}
            />
          </div>

          <RangeSlider
            min={0}
            max={1500}
            step={10}
            value={[price.priceFrom, price.priceTo]}
            onValueChange={([priceFrom, priceTo]) =>
              setPrice({ priceFrom, priceTo })
            }
          />
        </div>

        {/* Filter ingredients */}

        <CheckboxFiltersGroup
          className="mt-10"
          title="Інгредієнти"
          defaultItems={ingredients.slice(0, 6)}
          limit={6}
          items={ingredients}
          loading={loadingIngredients}
          selected={selectedIngredients}
          onClickCheckbox={onToggleId}
          name="ingredients"
        />

        {/* pizzaTypes   */}
        <CheckboxFiltersGroup
          className="mb-5 mt-5"
          title="Тип тіста"
          items={[
            { text: "Тонке", value: "1" },
            { text: "Традиційне", value: "2" },
          ]}
          selected={pizzaTypes}
          onClickCheckbox={toggleType}
          name="pizzaTypes"
        />
      </div>
    </>
  );
};
