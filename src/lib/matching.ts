import prisma from "./prisma";
import { calculateDistanceKm } from "./ai";

export interface MatchResult {
  volunteer: any;
  ngo: any;
  score: number;
  distanceKm: number;
  whatsAppLink: string;
}

export async function runAiMatchingEngine(listingId: string): Promise<MatchResult | null> {
  const listing = await prisma.foodListing.findUnique({
    where: { id: listingId },
    include: { donor: true },
  });

  if (!listing) return null;

  // 1. Fetch available volunteers
  const volunteers = await prisma.user.findMany({
    where: {
      role: "VOLUNTEER",
      volunteerProfile: {
        isAvailable: true,
      },
    },
    include: { volunteerProfile: true },
  });

  // 2. Fetch verified NGOs
  const ngos = await prisma.user.findMany({
    where: {
      role: "NGO",
      isVerified: true,
    },
    include: { ngoProfile: true },
  });

  if (volunteers.length === 0 || ngos.length === 0) {
    return null;
  }

  // Calculate scores for pairs
  const candidates: {
    volunteer: typeof volunteers[0];
    ngo: typeof ngos[0];
    score: number;
    distanceVolToDonor: number;
    distanceDonorToNgo: number;
  }[] = [];

  const now = Date.now();
  const expiryTime = new Date(listing.expiresAt).getTime();
  const hoursUntilExpiry = Math.max(0.5, (expiryTime - now) / (1000 * 3600));

  for (const vol of volunteers) {
    const dVolDonor = calculateDistanceKm(vol.lat, vol.lng, listing.lat, listing.lng);

    for (const ngo of ngos) {
      const dDonorNgo = calculateDistanceKm(listing.lat, listing.lng, ngo.lat, ngo.lng);
      const totalDistance = dVolDonor + dDonorNgo;

      // Base weight: Distance penalty
      let distanceScore = Math.max(0, 100 - totalDistance * 4);

      // Freshness factor
      let freshnessFactor = (listing.freshnessScore / 100) * 30;

      // Expiry Urgency factor (closer to expiry = higher urgency priority)
      let urgencyFactor = hoursUntilExpiry < 2 ? 35 : hoursUntilExpiry < 4 ? 20 : 10;

      // Volunteer reliability factor
      let volunteerReliability = (vol.volunteerProfile?.rating || 4.5) * 6; // up to ~30

      // NGO capacity fit
      let capacityFit = 10;
      if (ngo.ngoProfile && ngo.ngoProfile.capacityKgPerDay >= listing.quantityKg) {
        capacityFit = 20;
      }

      let compositeScore = Math.min(
        99.9,
        Math.round((distanceScore * 0.35 + freshnessFactor + urgencyFactor + volunteerReliability * 0.2 + capacityFit) * 10) / 10
      );

      candidates.push({
        volunteer: vol,
        ngo: ngo,
        score: compositeScore,
        distanceVolToDonor: dVolDonor,
        distanceDonorToNgo: dDonorNgo,
      });
    }
  }

  // Sort highest score first
  candidates.sort((a, b) => b.score - a.score);
  const bestMatch = candidates[0];
  if (!bestMatch) return null;

  // Create match in DB
  const createdMatch = await prisma.match.create({
    data: {
      listingId: listing.id,
      volunteerId: bestMatch.volunteer.id,
      ngoId: bestMatch.ngo.id,
      matchScore: bestMatch.score,
      status: "PROPOSED",
    },
  });

  // Update listing to MATCHED
  await prisma.foodListing.update({
    where: { id: listing.id },
    data: { status: "MATCHED" },
  });

  // Generate WhatsApp wa.me prefilled deep link
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const mapLink = `${appUrl}/map?lat=${listing.lat}&lng=${listing.lng}&listing=${listing.id}`;
  const acceptLink = `${appUrl}/volunteer`;
  const messageText = encodeURIComponent(
    `🚨 *RescueBite Mission Alert!*\n\n` +
    `Hello ${bestMatch.volunteer.name}! You are matched for an urgent food rescue:\n` +
    `🍲 *Food:* ${listing.title} (${listing.quantityKg} kg, approx ${listing.approxServings} servings)\n` +
    `📍 *Donor:* ${listing.address}\n` +
    `🏠 *Drop Shelter:* ${bestMatch.ngo.name}\n` +
    `⏱️ *Window:* ${listing.pickupWindowStart} - ${listing.pickupWindowEnd}\n` +
    `🗺️ *Live Radar:* ${mapLink}\n\n` +
    `👉 *Accept Mission:* ${acceptLink}`
  );

  const cleanPhone = (bestMatch.volunteer.phone || "919770869581").replace(/[^0-9]/g, "");
  const whatsAppLink = `https://wa.me/${cleanPhone}?text=${messageText}`;

  // Create In-App Notifications
  await prisma.notification.create({
    data: {
      userId: bestMatch.volunteer.id,
      title: "New Dispatch Mission Assigned",
      message: `Matched with ${listing.title} (${listing.quantityKg} kg) at ${listing.address}. Match Score: ${bestMatch.score}%`,
      type: "MATCH_ALERT",
      link: "/volunteer",
    },
  });

  await prisma.notification.create({
    data: {
      userId: bestMatch.ngo.id,
      title: "Incoming Surplus Delivery",
      message: `${listing.quantityKg} kg of ${listing.title} matched to your center from ${listing.address}.`,
      type: "STATUS_UPDATE",
      link: "/map",
    },
  });

  // Log audit
  await prisma.auditLog.create({
    data: {
      action: "AI_MATCH_GENERATED",
      actorId: "SYSTEM_AI_ENGINE",
      actorName: "RescueBite Matcher v2.4",
      actorRole: "SYSTEM",
      details: `Generated match for listing ${listing.id} with volunteer ${bestMatch.volunteer.name} and NGO ${bestMatch.ngo.name} (Score: ${bestMatch.score}%)`,
    },
  });

  return {
    volunteer: bestMatch.volunteer,
    ngo: bestMatch.ngo,
    score: bestMatch.score,
    distanceKm: bestMatch.distanceVolToDonor + bestMatch.distanceDonorToNgo,
    whatsAppLink,
  };
}

