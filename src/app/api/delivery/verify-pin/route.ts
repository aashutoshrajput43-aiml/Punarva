import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { listingId, pin, volunteerId, ngoId, dropPhotoUrl } = await req.json();

    if (!listingId || !pin) {
      return NextResponse.json({ error: "Listing ID and 4-digit PIN are required" }, { status: 400 });
    }

    const listing = await prisma.foodListing.findUnique({
      where: { id: listingId },
      include: { donor: true, matches: true },
    });

    if (!listing) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }

    if (listing.deliveryPin !== pin.trim()) {
      return NextResponse.json({ error: "Invalid 4-digit PIN. Please verify with the donor." }, { status: 400 });
    }

    if (listing.status === "DELIVERED") {
      return NextResponse.json({ error: "Listing is already marked as delivered." }, { status: 400 });
    }

    const assignedMatch = listing.matches?.[0];
    const finalVolunteerId = volunteerId || assignedMatch?.volunteerId || listing.donorId;
    const finalNgoId = ngoId || assignedMatch?.ngoId;

    const kg = listing.quantityKg;
    const meals = Math.round(kg * 3);
    const co2 = Math.round(kg * 2.5 * 10) / 10;
    const water = Math.round(kg * 500);
    const receiptNum = `RB-80G-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

    // 1. Create Delivery Record
    const delivery = await prisma.deliveryRecord.create({
      data: {
        listingId: listing.id,
        donorId: listing.donorId,
        volunteerId: finalVolunteerId,
        ngoId: finalNgoId,
        quantityKg: kg,
        mealsServed: meals,
        co2SavedKg: co2,
        waterSavedLiters: water,
        dropPhotoUrl: dropPhotoUrl || null,
        deliveryPinVerified: true,
        receiptNumber: receiptNum,
      },
    });

    // 2. Update Food Listing Status
    await prisma.foodListing.update({
      where: { id: listing.id },
      data: { status: "DELIVERED" },
    });

    // 3. Award Karma Points
    const donorKarmaGained = Math.round(kg * 10);
    const volunteerKarmaGained = Math.round(kg * 15 + (listing.isEmergency ? 50 : 0));

    await prisma.user.update({
      where: { id: listing.donorId },
      data: { karma: { increment: donorKarmaGained } },
    });

    if (finalVolunteerId) {
      await prisma.user.update({
        where: { id: finalVolunteerId },
        data: { karma: { increment: volunteerKarmaGained } },
      });

      // Update volunteer profile stats
      await prisma.volunteerProfile.updateMany({
        where: { userId: finalVolunteerId },
        data: { totalDeliveries: { increment: 1 } },
      });
    }

    // 4. In-App Notifications
    await prisma.notification.create({
      data: {
        userId: listing.donorId,
        title: "Food Delivered & 80G Certificate Ready!",
        message: `Your donation of ${kg} kg food was successfully delivered! ${meals} meals enabled. Your 80G certificate #${receiptNum} is ready.`,
        type: "STATUS_UPDATE",
        link: `/track/${listing.id}`,
      },
    });

    // 5. Audit Log
    await prisma.auditLog.create({
      data: {
        action: "DELIVERY_PIN_VERIFIED",
        actorId: finalVolunteerId,
        actorRole: "VOLUNTEER",
        details: `Successfully completed drop for listing ${listing.id}. Receipt #${receiptNum}, ${kg} kg rescued, ${meals} meals enabled.`,
      },
    });

    return NextResponse.json({
      success: true,
      deliveryRecord: delivery,
      receiptNumber: receiptNum,
      donorKarmaGained,
      volunteerKarmaGained,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

