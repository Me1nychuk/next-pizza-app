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
      <div
        className={cn(
          "flex flex-1 max-md:flex-col max-md:overflow-y-auto",
          className
        )}
      >
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
              "relative left-2 top-2 transition-all z-10 duration-300 max-md:w-[335px] max-md:h-[335px] max-md:static max-md:z-0"
            )}
          />
        </div>
        <div className="min-md:max-w-[490px] flex-1 max-md:w-full bg-[#f5f4f4] p-7">
          <Title size="md" className="font-bold  mb-[330px] max-md:mb-5 ">
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
