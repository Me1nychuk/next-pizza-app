import React from "react";
import { Categories, Container, SortPopup } from "@/components/shared";
import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";

interface Props {
  className?: string;
  categories: Category[];
}
export const TopBar = ({ className, categories }: Props) => {
  return (
    <>
      <div
        className={cn(
          "sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10",
          className
        )}
      >
        <Container className="flex items-center justify-between">
          <Categories categories={categories} />
          <SortPopup />
        </Container>
      </div>
    </>
  );
};
