import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { runAiMatchingEngine } from "@/lib/matching";

export async function GET() {
  try {
    // 1. Pending Food Donations
    const pendingFoodListings = await prisma.foodListing.findMany({
      where: { status: "SUBMITTED" },
      include: {
        donor: {
          select: {
            id: true,
            name: true,
            phone: true,
            email: true,
            city: true,
            donorProfile: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // 2. Pending NGO Applications
    const pendingNgos = await prisma.user.findMany({
      where: {
        role: "NGO",
        isVerified: false,
      },
      include: { ngoProfile: true },
    });

    // 3. Commercial Donor Registrations
    const commercialDonors = await prisma.user.findMany({
      where: {
        role: "DONOR",
      },
      include: { donorProfile: true },
      take: 10,
    });

    // 4. Approved History
    const approvedHistory = await prisma.foodListing.findMany({
      where: {
        status: { in: ["AVAILABLE", "MATCHED", "IN_TRANSIT", "DELIVERED"] },
      },
      include: { donor: true },
      orderBy: { updatedAt: "desc" },
      take: 10,
    });

    return NextResponse.json({
      pendingFoodListings,
      pendingNgos,
      commercialDonors,
      approvedHistory,
      counts: {
        pendingFood: pendingFoodListings.length,
        pendingNgos: pendingNgos.length,
        commercialDonors: commercialDonors.length,
        totalApproved: approvedHistory.length,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { action, id, reason, targetType } = await req.json(); // action: APPROVE, REJECT; targetType: FOOD, NGO

    if (!action || !id) {
      return NextResponse.json({ error: "Action and ID are required" }, { status: 400 });
    }

    if (targetType === "NGO") {
      if (action === "APPROVE") {
        await prisma.user.update({
          where: { id },
          data: { isVerified: true },
        });
        return NextResponse.json({ success: true, message: "NGO partner verified." });
      } else {
        await prisma.user.delete({ where: { id } });
        return NextResponse.json({ success: true, message: "NGO partner application rejected." });
      }
    }

    // Default targetType = FOOD
    if (action === "APPROVE") {
      const listing = await prisma.foodListing.update({
        where: { id },
        data: { status: "AVAILABLE" },
      });

      // Auto-trigger AI Matching Engine immediately!
      const match = await runAiMatchingEngine(id);

      await prisma.auditLog.create({
        data: {
          action: "ADMIN_APPROVED_FOOD_LISTING",
          actorName: "Admin User",
          actorRole: "ADMIN",
          details: `Approved and published food listing ${id} to live radar map. Auto-matching triggered.`,
        },
      });

      return NextResponse.json({ success: true, listing, match });
    } else {
      // REJECT
      const listing = await prisma.foodListing.update({
        where: { id },
        data: {
          status: "REJECTED",
          aiReasoning: reason || "Did not meet temperature or food safety compliance guidelines.",
        },
      });

      await prisma.auditLog.create({
        data: {
          action: "ADMIN_REJECTED_FOOD_LISTING",
          actorName: "Admin User",
          actorRole: "ADMIN",
          details: `Rejected food listing ${id}. Reason: ${reason || "Hygiene non-compliance"}`,
        },
      });

      return NextResponse.json({ success: true, listing });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

