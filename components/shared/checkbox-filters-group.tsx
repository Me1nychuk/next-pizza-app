"use client";

import React, { useState } from "react";
import { FilterCheckBoxProps, FilterCheckBox } from "./filter-checkbox";
import { Input, Skeleton } from "../ui";

type Item = FilterCheckBoxProps;
interface Props {
  title: string;
  items: Item[];
  defaultItems: Item[];
  limit?: number;
  loading?: boolean;
  searchInputPlaceholder?: string;
  onClickCheckbox?: (value: string) => void;
  defaultValue?: string;
  selectedIds?: Set<string>;
  name?: string;
  className?: string;
}
export const CheckboxFiltersGroup = ({
  title,
  items,
  defaultItems,
  limit = 5,
  searchInputPlaceholder = "Пошук..",
  onClickCheckbox,
  loading = true,
  defaultValue,
  selectedIds,
  className,
  name,
}: Props) => {
  const [showAll, setShowAll] = useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  const filteredItems = items.filter((item) =>
    item.text.toLowerCase().includes(searchValue.toLowerCase())
  );

  if (loading) {
    return (
      <div className={className}>
        <p className="text-base font-bold mb-3">{title}:</p>
        {
          <>
            {[...Array(limit)].map((_, i) => (
              <Skeleton className="mb-3.5 h-6 rounded-[8px]" key={i} />
            ))}
            <Skeleton className="mb-3.5 h-6 w-[115px] rounded-[8px]" />
          </>
        }
      </div>
    );
  }

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
              checked={selectedIds?.has(item.value)}
              onCheckedChange={() => onClickCheckbox?.(item.value)}
              name={name}
            />
          ))}
          {list.length === 0 && (
            <p className="text-center">Нічого не знайдено</p>
          )}
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
