"use client";

import { cn } from "@/shared/lib/utils";
import { useCategoryStore } from "@/shared/store/category";
import { Category } from "@prisma/client";
import React from "react";

interface Props {
  className?: string;
  categories: Category[];
}

export const Categories = ({ className, categories }: Props) => {
  const activeCategory = useCategoryStore((state) => state.activeId);
  return (
    <>
      <div
        className={cn(
          "inline-flex items-center gap-1 bg-gray-50 rounded-2xl p-1 flex-wrap",
          className
        )}
      >
        {categories.map(({ id, name }, i) => (
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
