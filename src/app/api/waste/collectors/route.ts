import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get("city");
    const material = searchParams.get("material");

    const collectorWhere: any = {};
    if (city) collectorWhere.city = city;
    if (material) {
      collectorWhere.materialsAccepted = { contains: material };
    }

    const collectors = await prisma.collector.findMany({
      where: collectorWhere,
    });

    const centres = await prisma.recyclingCentre.findMany({
      where: city ? { city } : {},
    });

    return NextResponse.json({ collectors, recyclingCentres: centres });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

