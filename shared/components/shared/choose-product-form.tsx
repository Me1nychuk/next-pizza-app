import { cn } from "@/lib/utils";
import { Title } from "@/components/shared";
import React from "react";
import { Button } from "@/components/ui";
import Image from "next/image";

interface ChooseProductFormProps {
  imageUrl: string;
  name: string;
  className?: string;
  items?: any[];
  onClickAdd?: VoidFunction;
}
export const ChooseProductForm = ({
  className,
  imageUrl,
  name,
  items,
  onClickAdd,
}: ChooseProductFormProps) => {
  const productDetails = `25 см, традиционное тесто 25, 380 г`;
  const totalPrice = 230;

  return (
    <>
      <div className={cn("flex flex-1", className)}>
        <div
          className={cn(
            "flex items-center justify-center flex-1 relative  w-full",
            className
          )}
        >
          <Image
            src={imageUrl}
            alt={name}
            width={350}
            height={350}
            className={cn(
              "relative left-2 top-2 transition-all z-10 duration-300 "
            )}
          />
        </div>
        <div className="w-[490px] bg-[#f5f4f4] p-7">
          <Title size="md" className="font-bold mb-1">
            {name}
          </Title>
          <p className="text-gray-400">{productDetails}</p>

          <Button className="h-[55px] px-10 text-base rounded-[18px] w-full">
            Додати до кошика за {totalPrice}₴
          </Button>
        </div>
      </div>
    </>
  );
};
