import { cn } from "@/shared/lib/utils";
import { Title } from "@/shared/components/shared";
import React from "react";
import { Button } from "@/shared/components/ui";
import Image from "next/image";

interface ChooseProductFormProps {
  imageUrl: string;
  name: string;
  className?: string;
  price: number;
  onClickAdd?: () => void;
  loading?: boolean;
}
export const ChooseProductForm = ({
  className,
  imageUrl,
  name,
  price,
  onClickAdd,
  loading,
}: ChooseProductFormProps) => {
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
          <Title size="md" className="font-bold mb-[330px] ">
            {name}
          </Title>

          <Button
            onClick={() => onClickAdd?.()}
            loading={loading}
            className="h-[55px] px-10 text-base rounded-[18px] w-full"
          >
            Додати до кошика за {price}₴
          </Button>
        </div>
      </div>
    </>
  );
};
