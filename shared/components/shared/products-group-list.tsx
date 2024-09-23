"use client";

import React, { useEffect } from "react";
import { useIntersection } from "react-use";
import { ProductCard, Title } from "@/shared/components/shared";
import { cn } from "@/shared/lib/utils";
import { useCategoryStore } from "@/shared/store/category";
import { IProduct } from "@/@types/prisma";

interface ProductsGroupListProps {
  title: string;
  items: IProduct[];
  categoryId: number;
  className?: string;
  listClassName?: string;
}
export const ProductsGroupList = ({
  title,
  items,
  className,
  listClassName,
  categoryId,
}: ProductsGroupListProps) => {
  const setActiveId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.3,
  });

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveId(categoryId);
    }
  }, [intersection?.isIntersecting, categoryId, setActiveId]);
  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title size="lg" className="font-extrabold mb-5">
        {title}
      </Title>

      <div
        className={cn(
          " grid grid-cols-3  max-md:grid-cols-2 max-sm:!grid-cols-1 gap-[50px]  max-lg:gap-[20px] max-sm:gap-5",
          listClassName
        )}
      >
        {items.map((item, i) => (
          <ProductCard
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.items[0].price}
            imageUrl={item.imageUrl}
            ingredients={item.ingredients}
          />
        ))}
      </div>
    </div>
  );
};
