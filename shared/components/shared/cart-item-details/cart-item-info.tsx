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
      <div className={cn("flex flex-col justify-between ", className)}>
        <h2 className="text-lg max-sm:text-base font-bold flex-1 leading-6">
          {name}
        </h2>
        {details && (
          <p className="text-sm max-sm:text-xs text-gray-400 w-[90%]">
            {details}
          </p>
        )}
      </div>
    </>
  );
};
