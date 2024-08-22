import { cn } from "@/shared/lib/utils";
import React from "react";

interface CartItemInfoProps {
  name: string;
  details: string;
  className?: string;
}
export const CartItemInfo = ({
  className,
  name,
  details,
}: CartItemInfoProps) => {
  return (
    <>
      <div>
        <div className={cn("flex items-center justify-between", className)}>
          <h2 className="text-lg font-bold flex-1 leading-6">{name}</h2>
        </div>
        {details && <p className="text-sm text-gray-400 w-[90%]">{details}</p>}
      </div>
    </>
  );
};
