import { cn } from "@/shared/lib/utils";
import React from "react";

interface CheckoutItemDetailsProps {
  className?: string;
  title: string;
  value: number;
  startAdornment?: React.ReactNode;
}
export const CheckoutItemDetails = ({
  className,
  title,
  value,
  startAdornment,
}: CheckoutItemDetailsProps) => {
  return (
    <div className="flex gap-1 items-center">
      {startAdornment}
      <div className={cn("flex flex-1 my-4", className)}>
        <span className="flex flex-1 text-lg text-neutral-500">
          {title}
          <div className="flex-1 border-b border-dashed border-b-neutral-500 relative -top-1 mx-2"></div>
        </span>
        <span className="text-lg font-bold">{value} ₴</span>
      </div>
    </div>
  );
};
