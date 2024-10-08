"use client";

import { useForm, FormProvider } from "react-hook-form";
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
import { createOrder } from "@/app/api/actions";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { Api } from "@/shared/services/api-client";

const Page: React.FC = () => {
  const { totalAmount, items, updateItemsQuantity, deleteCartItem, loading } =
    useCart();
  const [submitting, setSubmitting] = React.useState(false);

  const { data: session } = useSession();

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

  React.useEffect(() => {
    const fetchUserInfo = async () => {
      const data = await Api.auth.getMe();

      const [firstName, secondName] = data.fullName.split(" ");

      form.setValue("firstName", firstName);
      form.setValue("secondName", secondName);
      form.setValue("email", data.email);
    };

    if (session) fetchUserInfo();
  }, [session]);

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      setSubmitting(true);
      const url = await createOrder(data);

      toast.success("Ваше замовлення надіслано", { icon: "✅" });
      toast.success("На даний момент оплата не працює", { icon: "⚠" });
      if (url) {
        location.href = url;
      }
    } catch (error) {
      setSubmitting(false);
      console.log(error);
      toast.error("Ваше замовлення не надіслано", { icon: "❌" });
    }
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
            <div className="flex items-start gap-10 max-lg:flex-col">
              <div className="flex flex-col gap-10 flex-1 mb-20 max-lg:mb-0 max-lg:max-w-full">
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
              <CheckoutSidebar
                totalAmount={totalAmount}
                loading={loading || submitting}
              />
            </div>
          </form>
        </FormProvider>
      </Container>
    </>
  );
};

export default Page;
