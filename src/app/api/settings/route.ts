import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const settings = await prisma.cmsSetting.findMany();
    const map: Record<string, string> = {};
    for (const s of settings) {
      map[s.key] = s.value;
    }
    return NextResponse.json(map);
  } catch (e: any) {
    return NextResponse.json({
      helpline_phone: "+91 97708 69581",
      helpline_email: "hello@rescuebite.in",
    });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    for (const [key, value] of Object.entries(body)) {
      if (typeof value === "string") {
        await prisma.cmsSetting.upsert({
          where: { key },
          update: { value },
          create: { key, value },
        });
      }
    }
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

