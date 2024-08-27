"use client";

import React from "react";
import {
  CheckboxFiltersGroup,
  RangeSlider,
  Title,
} from "@/shared/components/shared";
import { Input } from "../ui";
import { useQueryFilters, useFilters, useIngredients } from "@/shared/hooks";

interface Props {
  className?: string;
}

export const Filters = ({ className }: Props) => {
  const { ingredients: basicIngredients, loading: loadingIngredients } =
    useIngredients();

  const filters = useFilters();

  useQueryFilters(filters);

  const ingredients = basicIngredients.map((ingredient) => ({
    text: ingredient.name,
    value: String(ingredient.id),
  }));

  return (
    <>
      <div className={className}>
        <Title className="font-bold mb-5">Фільтрація</Title>
        {/* top checkboxes */}

        {/* pizzaTypes   */}
        <CheckboxFiltersGroup
          className="mb-5 mt-5"
          title="Тип тіста"
          items={[
            { text: "Тонке", value: "1" },
            { text: "Традиційне", value: "2" },
          ]}
          selected={filters.pizzaTypes}
          onClickCheckbox={filters.setPizzaTypes}
          name="pizzaTypes"
        />
        <CheckboxFiltersGroup
          className="mb-5"
          title="Розміри"
          items={[
            { text: "20 см", value: "20" },
            { text: "30 см", value: "30" },
            { text: "40 см", value: "40" },
          ]}
          selected={filters.sizes}
          onClickCheckbox={filters.setSizes}
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
              value={String(filters.prices.priceFrom)}
              onChange={(e) =>
                filters.setPrice("priceFrom", Number(e.target.value))
              }
              step={10}
            />
            <Input
              type="number"
              placeholder="0"
              min={0}
              max={1500}
              value={String(filters.prices.priceTo)}
              onChange={(e) =>
                filters.setPrice("priceTo", Number(e.target.value))
              }
              step={10}
            />
          </div>

          <RangeSlider
            min={0}
            max={1500}
            step={10}
            value={[
              filters.prices.priceFrom || 0,
              filters.prices.priceTo || 1500,
            ]}
            onValueChange={([priceFrom, priceTo]) =>
              filters.setPrices({ priceFrom, priceTo })
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
          selected={filters.selectedIngredients}
          onClickCheckbox={filters.setSelectedIngredients}
          name="ingredients"
        />
      </div>
    </>
  );
};
