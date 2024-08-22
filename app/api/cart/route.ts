import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(res: NextRequest) {
  try {
    const userId = 1;
    const token = res.cookies.get("cartToken")?.value;

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
