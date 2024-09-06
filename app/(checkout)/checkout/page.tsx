"use client";

import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CheckoutSidebar, Container, Title } from "@/shared/components/shared";
import { useCart } from "@/shared/hooks";
import React from "react";
import {
  CheckoutAddressForm,
  CheckoutCart,
  CheckoutPersonalForm,
} from "@/shared/components/shared/checkout-components";
import {
  CheckoutFormSchema,
  CheckoutFormValues,
} from "@/shared/components/shared/checkout-components/checkout-form-schema";

const Page: React.FC = () => {
  const { totalAmount, items, updateItemsQuantity, deleteCartItem, loading } =
    useCart();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(CheckoutFormSchema),
    defaultValues: {
      firstName: "",
      secondName: "",
      email: "",
      phone: "",
      address: "",
      comment: "",
    },
  });

  const onSubmit = (data: CheckoutFormValues) => {
    console.log(data);
  };
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

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex items-start gap-10">
              <div className="flex flex-col gap-10 flex-1 mb-20">
                <CheckoutCart
                  items={items}
                  onClickCountButton={onClickCountButton}
                  deleteCartItem={deleteCartItem}
                  loading={loading}
                />
                <CheckoutPersonalForm
                  className={loading ? "opacity-40 pointer-events-none " : ""}
                />
                <CheckoutAddressForm
                  className={loading ? "opacity-40 pointer-events-none " : ""}
                />
              </div>
              <CheckoutSidebar totalAmount={totalAmount} loading={loading} />
            </div>
          </form>
        </FormProvider>
      </Container>
    </>
  );
};

export default Page;
