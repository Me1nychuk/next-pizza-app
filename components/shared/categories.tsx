import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className?: string;
}

const cats = [
  "Піци",
  "Комбо",
  "Закуски",
  "Коктейлі",
  "Кава",
  "Напої",
  "Десерти",
];
const activeCategory = 0;

export const Categories = ({ className }: Props) => {
  return (
    <>
      <div
        className={cn(
          "inline-flex items-center gap-1 bg-gray-50 rounded-2xl p-1",
          className
        )}
      >
        {cats.map((cat, i) => (
          <a
            className={cn(
              "flex items-center font-bold h-11  rounded-2xl px-5",
              activeCategory === i &&
                "bg-white shadow-md shadow-gray-200 text-primary"
            )}
            key={i}
          >
            <button>{cat}</button>
          </a>
        ))}
      </div>
    </>
  );
};
