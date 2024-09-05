"use client";

import {
  CheckoutItem,
  CheckoutSidebar,
  Container,
  Title,
  WhiteBlock,
} from "@/shared/components/shared";
import { Input, Textarea } from "@/shared/components/ui";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { useCart } from "@/shared/hooks";
import { getCartItemDetails } from "@/shared/lib";
import { Trash } from "lucide-react";
import { FormInput } from "@/shared/components/shared/form-components";
import React from "react";

const Page: React.FC = () => {
  const { totalAmount, items, updateItemsQuantity, deleteCartItem, loading } =
    useCart();
  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    updateItemsQuantity(id, type === "plus" ? quantity + 1 : quantity - 1);
  };
  return (
    <>
      <Container className="mt-10 relative">
        <Title className="font-extrabold mb-8 text-[36px]">
          Оформлення замовлення
        </Title>

        <div className="flex items-start gap-10">
          <div className="flex flex-col gap-10 flex-1 mb-20">
            <WhiteBlock
              title="1. Кошик"
              contentClassName="py-0 px-6"
              endAdornment={
                <div className="flex items-center gap-2 text-gray-400 cursor-pointer hover:text-gray-700 transition-all duration-300">
                  Очистити Кошик <Trash size={16} />
                </div>
              }
            >
              {items.map((item) => (
                <CheckoutItem
                  key={item.id}
                  id={item.id}
                  imageUrl={item.imageUrl}
                  details={
                    item.pizzaSize && item.pizzaType
                      ? getCartItemDetails(
                          item.ingredients,
                          item.pizzaType as PizzaType,
                          item.pizzaSize as PizzaSize
                        )
                      : ""
                  }
                  disabled={item.disabled}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  onClickCountButton={(type) =>
                    onClickCountButton(item.id, item.quantity, type)
                  }
                  onClickRemove={() => deleteCartItem(item.id)}
                />
              ))}
            </WhiteBlock>

            <WhiteBlock title="2. Персональні дані" contentClassName="">
              <div className="grid grid-cols-2 gap-5">
                <Input name="name" type="text" placeholder="Ваше ім'я" />
                <Input name="surname" type="text" placeholder="Ваше прізвище" />
                <Input
                  name="email"
                  type="email"
                  placeholder="Ваша електронна пошта"
                />
                <FormInput
                  className="appearance-none no-spin"
                  name="number"
                  type="number"
                  placeholder="Номер телефону"
                />
              </div>
            </WhiteBlock>

            <WhiteBlock title="3. Адреса доставки " contentClassName="">
              <div className="flex flex-col gap-5">
                <Input
                  name="address"
                  type="text"
                  placeholder="Ваша адреса до замовлення"
                />
                <Textarea
                  className="text-base"
                  rows={5}
                  name="comment"
                  placeholder="Ваш коментар"
                />
              </div>
            </WhiteBlock>
          </div>
          <CheckoutSidebar totalAmount={totalAmount} loading={loading} />
        </div>
      </Container>
    </>
  );
};

export default Page;
