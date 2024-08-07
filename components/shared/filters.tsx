import React from "react";
import {
  CheckboxFiltersGroup,
  FilterCheckBox,
  RangeSlider,
  Title,
} from "@/components/shared";
import { Input } from "../ui";

interface Props {
  className?: string;
}

const pizzaIngredients = [
  { text: "Пепероні", value: "pepperoni" },
  { text: "Шинка", value: "ham" },
  { text: "Гриби", value: "mushrooms" },
  { text: "Паприка", value: "bell_peppers" },
  { text: "Оливки", value: "olives" },
  { text: "Цибуля", value: "onions" },
  { text: "Часник", value: "garlic" },
  { text: "Томати", value: "tomatoes" },
  { text: "Сир моцарела", value: "mozzarella" },
  { text: "Чеддер", value: "cheddar" },
  { text: "Рикота", value: "ricotta" },
  { text: "Бекон", value: "bacon" },
  { text: "Курка", value: "chicken" },
  { text: "Анчоуси", value: "anchovies" },
  { text: "Артишоки", value: "artichokes" },
];

export const Filters = ({ className }: Props) => {
  return (
    <>
      <div className={className}>
        <Title className="font-bold mb-5">Фільтрація</Title>
        {/* top checkboxes */}
        <div className="flex flex-col gap-4">
          <FilterCheckBox value="1" text="Можна збирати" />
          <FilterCheckBox value="2" text="Новинки" />
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
              defaultValue={0}
            />
            <Input
              type="number"
              placeholder="0"
              min={0}
              max={1500}
              value={1200}
            />
          </div>

          <RangeSlider min={0} max={1500} step={10} value={[0, 1500]} />
        </div>

        {/* Filter ingredients */}

        <CheckboxFiltersGroup
          className="mt-10"
          title="Інгредієнти"
          defaultItems={pizzaIngredients.slice(0, 5)}
          items={pizzaIngredients}
        />
      </div>
    </>
  );
};
