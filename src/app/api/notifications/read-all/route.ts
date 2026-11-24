import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

export async function POST() {
  try {
    const session = await getSessionUser();
    if (session) {
      await prisma.notification.updateMany({
        where: { userId: session.id },
        data: { isRead: true },
      });
    } else {
      await prisma.notification.updateMany({
        data: { isRead: true },
      });
    }
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

