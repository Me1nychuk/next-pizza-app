"use server";

import { prisma } from "@/prisma/prisma-client";
import { CheckoutFormValues } from "@/shared/components/shared/checkout-components/checkout-form-schema";
import { OrderStatus, Prisma } from "@prisma/client";
import { cookies } from "next/headers";
import { sendEmail } from "@/shared/lib";
import { PayOrderTemplate } from "@/shared/components/shared/email-templates/pay-order";
import { getUserSession } from "@/shared/lib/get-user-session";
import { hashSync } from "bcrypt";
import { VerificationUserTemplate } from "@/shared/components/shared/email-templates/verification-user";
// import { createPayment } from "@/shared/lib/create-payment";

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
        fullName: data.firstName + " " + data.secondName,
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
        paymentLink: "https://www.linkedin.com/in/sviatoslav-melnychuk/",
      })
    );
    return "https://www.linkedin.com/in/sviatoslav-melnychuk/";
  } catch (error) {
    console.log("[createOrder] server error", error);
  }
};

export const updateUserInfo = async (body: Prisma.UserUpdateInput) => {
  try {
    const session = await getUserSession();
    if (!session) {
      throw new Error("User not found");
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(session?.id),
      },
    });
    const user = await prisma.user.update({
      where: {
        id: Number(session?.id),
      },
      data: {
        email: body.email,
        fullName: body.fullName,
        password: body.password
          ? hashSync(String(body.password), 10)
          : findUser?.password,
      },
    });
    return user;
  } catch (error) {
    console.error("[updateUserInfo] server error", error);
  }
};

export const registerUser = async (body: Prisma.UserCreateInput) => {
  try {
    const findUser = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (findUser) {
      if (!findUser.verified) {
        throw new Error("Email is already registered and not verified");
      }
      throw new Error("Email already registered");
    }

    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        fullName: body.fullName,
        password: hashSync(String(body.password), 10),
      },
    });

    const code = String(Math.floor((9999 / Math.random()) * 899898)).slice(
      0,
      4
    );

    const verificationCode = await prisma.verificationCode.create({
      data: {
        code,
        userId: newUser.id,
      },
    });
    if (!verificationCode) {
      await prisma.user.delete({
        where: {
          id: newUser.id,
        },
      });
      throw new Error("Error creating verification code");
    }

    await sendEmail(
      newUser.email,
      "NEXT PIZZA APP: Верифікація електронної пошти",
      VerificationUserTemplate({
        code,
      })
    );
  } catch (error) {
    console.error("[registerUser] server error", error);
  }
};
