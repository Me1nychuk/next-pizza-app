import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui";
import { Plus } from "lucide-react";
import { Title } from "@/components/shared";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  className?: string;
}
export const ProductCard = ({
  id,
  name,
  price,
  imageUrl,
  className,
}: ProductCardProps) => {
  return (
    <>
      <div className={className}>
        <Link href={"/products/" + id}>
          <div className="flex items-center justify-center p-6 bg-secondary rounded-lg h-[260px]">
            <Image
              className="h-[215px] w-[215px]"
              src={imageUrl}
              alt={name}
              width={215}
              height={215}
            />
          </div>

          <Title className="mt-3 mb-1 font-bold" size="sm">
            {name}
          </Title>

          <p className="mb-3 text-sm text-gray-400">
            Курча, моцарела, сири чеддер і пармезан, сирний соус, томати, соус
            альфредо, часник
          </p>
          <div className="flex justify-between ">
            <span className="text-[20px]">
              від <b>{price} ₴</b>
            </span>
            <Button variant="secondary" className="text-base font-bold">
              <Plus size={20} className="mr-1" />
              Додати
            </Button>
          </div>
        </Link>
      </div>
    </>
  );
};
