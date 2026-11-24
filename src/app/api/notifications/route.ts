import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSessionUser();
    const where: any = {};
    if (session) {
      where.OR = [
        { userId: session.id },
        { type: "EMERGENCY_ALERT" },
      ];
    }

    const notifications = await prisma.notification.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 15,
    });

    return NextResponse.json({ notifications });
  } catch (err: any) {
    return NextResponse.json({ notifications: [] });
  }
}

