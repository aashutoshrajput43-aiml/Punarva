import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
    }

    const newMessage = await prisma.message.create({
      data: {
        name,
        email,
        subject: subject || "General Inquiry",
        message,
      },
    });

    // Notify admins
    const admins = await prisma.user.findMany({ where: { role: "ADMIN" } });
    for (const a of admins) {
      await prisma.notification.create({
        data: {
          userId: a.id,
          title: "New Contact Message",
          message: `Inquiry from ${name}: "${subject || message.slice(0, 40)}"`,
          type: "SYSTEM",
          link: "/admin",
        },
      });
    }

    return NextResponse.json({ success: true, id: newMessage.id });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

