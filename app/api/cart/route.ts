import { prisma } from "@/prisma/prisma-client";
import { updateCartTotalAmount } from "@/shared/lib";
import { findOrCreateCart } from "@/shared/lib/find-or-create-cart";
import { CreateCartItemValues } from "@/shared/services/dto/cart.dto";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userId = 1;
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ totalAmount: 0, items: [] });
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [
          {
            token,
          },
        ],
      },
      include: {
        items: {
          orderBy: { createdAt: "desc" },
          include: {
            productItem: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    });

    if (!userCart) {
      return NextResponse.json({ items: [] });
    }
    return NextResponse.json(userCart);
  } catch (error) {
    console.log(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get("cartToken")?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    const userCart = await findOrCreateCart(token);

    const data = (await req.json()) as CreateCartItemValues;

    // TODO: change logic to find a right cart item, because prisma doesn't support it
    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productItemId: data.productItemId,
        ingredients: { every: { id: { in: data.ingredients } } },
      },
    });

    if (findCartItem) {
      await prisma.cartItem.update({
        where: { id: findCartItem.id },
        data: { quantity: findCartItem.quantity + 1 },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productItemId: data.productItemId,
          quantity: 1,
          ingredients: { connect: data.ingredients?.map((i) => ({ id: i })) },
        },
      });
    }

    const updatedUserCart = await updateCartTotalAmount(token);
    const resp = NextResponse.json(updatedUserCart);
    resp.cookies.set({
      name: "cartToken",
      value: token,
      maxAge: 60 * 60 * 24 * 7 * 4 * 6,
    });

    return resp;
  } catch (error) {
    console.log("[CART_PATCH] Server Error", error);
    return NextResponse.json(
      { message: "[CART_DELETE] Cart create failed" },
      { status: 500 }
    );
  }
}
