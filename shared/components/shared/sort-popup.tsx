import { cn } from "@/shared/lib/utils";
import { ArrowUpDown } from "lucide-react";
import React from "react";

interface Props {
  className?: string;
}
export const SortPopup = ({ className }: Props) => {
  return (
    <>
      <div
        className={cn(
          "inline-flex items-center gap-1 px-5 bg-gray-50 h-[55px]  rounded-2xl cursor-pointer",
          className
        )}
      >
        <ArrowUpDown size={16} />
        <b>Сортування: </b>
        <b className="text-primary">рейтингу</b>
      </div>
    </>
  );
};
