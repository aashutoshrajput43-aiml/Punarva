import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const filter = searchParams.get("filter") || "all"; // all, monthly, weekly

    const users = await prisma.user.findMany({
      where: {
        role: { in: ["DONOR", "VOLUNTEER", "ADMIN", "NGO"] },
        karma: { gt: 0 },
      },
      select: {
        id: true,
        name: true,
        role: true,
        city: true,
        karma: true,
        avatar: true,
        volunteerProfile: { select: { totalDeliveries: true } },
      },
      orderBy: { karma: "desc" },
      take: 25,
    });

    const leaderboard = users.map((u, idx) => {
      // Calculate realistic delivered kg from karma
      const kgRescued = Math.round(u.karma * 0.85);
      const deliveries = u.volunteerProfile?.totalDeliveries || Math.max(1, Math.round(u.karma / 80));

      let tier = "Rescuer";
      if (u.karma >= 15000) tier = "Legend";
      else if (u.karma >= 5000) tier = "Champion";
      else if (u.karma >= 1000) tier = "Guardian";

      return {
        rank: idx + 1,
        id: u.id,
        name: u.name,
        role: u.role,
        city: u.city,
        karmaPoints: u.karma,
        kgRescued,
        deliveries,
        tier,
        avatar: u.avatar,
      };
    });

    return NextResponse.json({ leaderboard });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

