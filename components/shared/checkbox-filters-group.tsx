"use client";

import React, { useState } from "react";
import { FilterCheckBoxProps, FilterCheckBox } from "./filter-checkbox";
import { Input } from "../ui";

type Item = FilterCheckBoxProps;
interface Props {
  title: string;
  items: Item[];
  defaultItems: Item[];
  limit?: number;
  searchInputPlaceholder?: string;
  onChange?: (value: string[]) => void;
  defaultValue?: string;
  className?: string;
}
export const CheckboxFiltersGroup = ({
  title,
  items,
  defaultItems,
  limit = 5,
  searchInputPlaceholder = "Пошук..",
  onChange,
  defaultValue,
  className,
}: Props) => {
  const [showAll, setShowAll] = useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  const filteredItems = items.filter((item) =>
    item.text.toLowerCase().includes(searchValue.toLowerCase())
  );
  const list = showAll ? filteredItems : defaultItems.slice(0, limit);

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <div className={className}>
        <p className="text-base font-bold mb-3">{title}:</p>

        {showAll && (
          <div className="mb-5">
            <Input
              onChange={onChangeSearchInput}
              placeholder={searchInputPlaceholder}
              className="bg-gray-50 border-none"
            />
          </div>
        )}

        <div className="flex flex-col gap-4  max-h-96 pr-2  overflow-auto scrollbar">
          {list.map((item, i) => (
            <FilterCheckBox
              key={i}
              value={item.value}
              text={item.text}
              endAdornment={item.endAdornment}
              checked={false}
              onCheckedChange={() => console.log("clicked")}
            />
          ))}
        </div>

        {items.length > limit && (
          <div className={showAll ? "border-t border-t-neutral-50 mt-4" : ""}>
            <button
              className="text-primary mt-3"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Приховати -" : "Показати всі +"}
            </button>
          </div>
        )}
      </div>
    </>
  );
};
