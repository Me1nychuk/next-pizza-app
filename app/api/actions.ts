"use server";

import { prisma } from "@/prisma/prisma-client";
import { CheckoutFormValues } from "@/shared/components/shared/checkout-components/checkout-form-schema";
import { OrderStatus } from "@prisma/client";
import { cookies } from "next/headers";
import { sendEmail } from "@/shared/lib";
import { PayOrderTemplate } from "@/shared/components/shared/email-templates/pay-order";

export const createOrder = async (data: CheckoutFormValues) => {
  try {
    const cookieStore = cookies();
    const cartToken = cookieStore.get("cartToken")?.value;
    if (!cartToken) {
      throw new Error("Cart token not found");
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        token: cartToken,
      },
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });

    if (!userCart) {
      throw new Error("Cart not found");
    }
    if (userCart.items.length === 0) {
      throw new Error("Cart is empty");
    }

    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullname: data.firstName + " " + data.secondName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    });

    await prisma.cart.update({
      where: { id: userCart.id },
      data: { totalAmount: 0 },
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });
    // TODO: add payment
    await sendEmail(
      data.email,
      "NEXT PIZZA APP: Замовлення відправлено",
      PayOrderTemplate({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentLink: "https://lucide.dev/icons/badge-alert",
      })
    );
  } catch (error) {
    console.log("[createOrder] server error", error);
  }

  return "https://lucide.dev/icons/badge-alert";
};
