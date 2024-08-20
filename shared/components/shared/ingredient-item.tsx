import { cn } from "@/shared/lib/utils";
import { CircleCheck } from "lucide-react";
import Image from "next/image";
import React from "react";

interface IngredientProps {
  imageUrl: string;
  name: string;
  price: number;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}
export const IngredientItem = ({
  className,
  imageUrl,
  name,
  price,
  active,
  onClick,
}: IngredientProps) => {
  return (
    <>
      <div
        className={cn(
          "flex items-center flex-col w-32 p-2.5 border hover:border-primary/50 cursor-pointer text-center relative bg-white shadow-md rounded-sm transition-all ",
          { " border-primary": active },
          className
        )}
        onClick={onClick}
      >
        {active && (
          <CircleCheck className="absolute top-2 right-2 text-primary" />
        )}
        <Image
          className="mb-1"
          src={imageUrl}
          alt={name}
          width={110}
          height={110}
        />
        <span className="text-xs mb-auto">{name}</span>
        <span className="text-xs font-semibold">{price} ₴</span>
      </div>
    </>
  );
};
