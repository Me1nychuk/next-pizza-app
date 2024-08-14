import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
  const respond = await prisma.ingredient.findMany();
  return NextResponse.json(respond);
}
