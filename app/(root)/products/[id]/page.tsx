import {
  Container,
  GroupVariants,
  PizzaImage,
  Title,
} from "@/shared/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";
import React from "react";

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
  });
  if (!product) return notFound();

  return (
    <>
      <Container className="flex flex-col my-10">
        <div className="flex flex-1 min-h-[500px]">
          <PizzaImage
            src={product.imageUrl}
            alt={product.name}
            className=""
            size={20}
          />
          <div className="w-[490px] bg-[#f5f4f4] p-7">
            <Title size="md" className="font-bold mb-1">
              {product.name}
            </Title>
            <p className="text-gray-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>

            <GroupVariants
              items={[
                { name: "Мала", value: "1" },
                { name: "Середня", value: "2", disabled: true },
                { name: "Велика", value: "3" },
              ]}
              selectedValue="1"
            />
          </div>
        </div>
      </Container>
    </>
  );
}
