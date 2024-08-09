"use client";

import { cn } from "@/lib/utils";
import { useCategoryStore } from "@/store/category";
import React from "react";

interface Props {
  className?: string;
}

const cats = [
  { id: 1, name: "Піци" },
  { id: 2, name: "Комбо" },
  { id: 3, name: "Закуски" },
  { id: 4, name: "Коктейлі" },
  { id: 5, name: "Кава" },
  { id: 6, name: "Напої" },
  { id: 7, name: "Десерти" },
];

export const Categories = ({ className }: Props) => {
  const activeCategory = useCategoryStore((state) => state.activeId);
  return (
    <>
      <div
        className={cn(
          "inline-flex items-center gap-1 bg-gray-50 rounded-2xl p-1",
          className
        )}
      >
        {cats.map(({ id, name }, i) => (
          <a
            className={cn(
              "flex items-center font-bold h-11  rounded-2xl px-5",
              activeCategory === id &&
                "bg-white shadow-md shadow-gray-200 text-primary"
            )}
            key={i}
            href={`#${name}`}
          >
            <button>{name}</button>
          </a>
        ))}
      </div>
    </>
  );
};
