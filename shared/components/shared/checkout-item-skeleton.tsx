import { cn } from "@/shared/lib/utils";
import React from "react";
import { Skeleton } from "@/shared/components/ui";

interface CheckoutItemSkeletonProps {
  className?: string;
}
export const CheckoutItemSkeleton = ({
  className,
}: CheckoutItemSkeletonProps) => {
  return (
    <>
      <div
        className={cn(
          "flex items-center bg-white p-8  gap-5 border-y border-y-neutral-100",
          className
        )}
      >
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="flex-1">
          <Skeleton className="h-8 w-[150px] mb-1" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
        <div className="flex-1">
          <Skeleton className="h-8 w-16 mx-auto" />
        </div>
        <div className="w-[90px] flex justify-between ">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
        </div>
        <Skeleton className="h-8 w-8" />
      </div>
    </>
  );
};
