import { prisma } from "@/prisma/prisma-client";
import { getUserSession } from "@/shared/lib/get-user-session";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getUserSession();

    if (!session) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const data = await prisma.user.findFirst({
      where: {
        id: Number(session?.id),
      },
      select: {
        fullName: true,
        email: true,
        password: false,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("[me] server error", error);

    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
