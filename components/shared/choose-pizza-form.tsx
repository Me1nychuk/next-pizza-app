import { cn } from "@/lib/utils";
import { PizzaImage, Title } from "@/components/shared";
import React from "react";
import { Button } from "@/components/ui";
import Image from "next/image";

interface ChoosePizzaFormProps {
  imageUrl: string;
  name: string;
  className?: string;
  ingredients: any[];
  items?: any[];
  onClickAdd?: VoidFunction;
}
export const ChoosePizzaForm = ({
  className,
  imageUrl,
  name,
  ingredients,
  items,
  onClickAdd,
}: ChoosePizzaFormProps) => {
  const productDetails = `25 см, традиционное тесто 25, 380 г`;
  const totalPrice = 230;

  return (
    <>
      <div className={cn("flex flex-1", className)}>
        <PizzaImage src={imageUrl} alt={name} size={20} />

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
