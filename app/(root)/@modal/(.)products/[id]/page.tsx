import { ChooseProductModal } from "@/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";
import React from "react";

interface ProductProps {
  params: {
    id: string;
  };
}
const Page = async ({ params: { id } }: ProductProps) => {
  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      ingredients: true,
      items: true,
    },
  });

  if (!product) return notFound();

  return <ChooseProductModal product={product} />;
};

export default Page;
