import { cn } from "@/lib/utils";
import React from "react";

type Variant = {
  name: string;
  value: string;
  disabled?: boolean;
};

interface GroupVariantsProps {
  items: Variant[];
  onClick?: (value: Variant["value"]) => void;
  selectedValue?: Variant["value"];
  className?: string;
}
export const GroupVariants = ({
  className,
  items,
  onClick,
  selectedValue,
}: GroupVariantsProps) => {
  return (
    <>
      <div
        className={cn(
          "flex justify-between rounded-3xl bg-[#ececec]  p-1 select-none",
          className
        )}
      >
        {items.map((item) => (
          <button
            key={item.name}
            className={cn(
              "flex items-center justify-center cursor-pointer h-[30px]  px-5 flex-1 rounded-3xl transition-all duration-300 text-sm",
              {
                "bg-white ": item.value == selectedValue,
                "text-gray-500 opacity-50 pointer-events-none cursor-not-allowed":
                  item.disabled,
              }
            )}
          >
            {item.name}
          </button>
        ))}
      </div>
    </>
  );
};
