import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getSessionUser();
    const body = await req.json();

    const {
      wasteCategory,
      estimatedKg,
      contactName,
      phone,
      address,
      lat,
      lng,
      preferredTime,
      collectorId,
    } = body;

    if (!wasteCategory || !estimatedKg || !contactName || !phone || !address) {
      return NextResponse.json({ error: "Missing required pickup details" }, { status: 400 });
    }

    // Auto-match nearest or selected collector
    let targetCollectorId = collectorId;
    if (!targetCollectorId) {
      const firstCollector = await prisma.collector.findFirst();
      targetCollectorId = firstCollector?.id || null;
    }

    const newRequest = await prisma.pickupRequest.create({
      data: {
        wasteCategory,
        estimatedKg: Number(estimatedKg),
        contactName,
        phone,
        address,
        lat: Number(lat) || 22.7196,
        lng: Number(lng) || 75.8577,
        preferredTime: preferredTime || "Tomorrow Morning",
        status: "ASSIGNED",
        collectorId: targetCollectorId,
      },
      include: { collector: true },
    });

    // Award karma to user if logged in
    if (session) {
      await prisma.user.update({
        where: { id: session.id },
        data: { karma: { increment: Math.round(Number(estimatedKg) * 5) } },
      });
    }

    // Log audit
    await prisma.auditLog.create({
      data: {
        action: "WASTE_PICKUP_REQUESTED",
        actorName: contactName,
        actorRole: "CITIZEN",
        details: `Requested pickup of ${estimatedKg} kg ${wasteCategory} at ${address}. Assigned to ${newRequest.collector?.name || "Municipal MRF"}.`,
      },
    });

    return NextResponse.json({ success: true, pickupRequest: newRequest });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

