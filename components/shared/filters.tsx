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
    selectedIds,
    onToggleId,
  } = useFilterIngredients();

  const [price, setPrice] = React.useState<PriceProps>({
    priceFrom: 0,
    priceTo: 1500,
  });

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

  return (
    <>
      <div className={className}>
        <Title className="font-bold mb-5">Фільтрація</Title>
        {/* top checkboxes */}
        <div className="flex flex-col gap-4">
          <FilterCheckBox name="dfd" value="1" text="Можна збирати" />
          <FilterCheckBox name="dfa" value="2" text="Новинки" />
        </div>

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
          selectedIds={selectedIds}
          onClickCheckbox={onToggleId}
          name="ingredients"
        />
      </div>
    </>
  );
};
