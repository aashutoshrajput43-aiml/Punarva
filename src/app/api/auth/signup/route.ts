import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword, signToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      email,
      password,
      name,
      role, // DONOR, VOLUNTEER, NGO
      phone,
      city,
      address,
      businessName,
      businessType,
      fssaiLicense,
      vehicleType,
      darpanId,
      registrationNo,
    } = body;

    if (!email || !password || !name || !role) {
      return NextResponse.json({ error: "Missing required registration fields" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existing) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 400 });
    }

    const passwordHash = await hashPassword(password);

    // City coordinates lookup
    const cityCoords: Record<string, { lat: number; lng: number }> = {
      Indore: { lat: 22.7196, lng: 75.8577 },
      Bhopal: { lat: 23.2599, lng: 77.4126 },
      "Delhi NCR": { lat: 28.6139, lng: 77.2090 },
      "Mumbai Central": { lat: 19.0760, lng: 72.8777 },
      "Pune City": { lat: 18.5204, lng: 73.8567 },
      "Bangalore Hub": { lat: 12.9716, lng: 77.5946 },
    };

    const targetCoords = cityCoords[city] || cityCoords["Indore"];

    const newUser = await prisma.user.create({
      data: {
        email: email.toLowerCase().trim(),
        passwordHash,
        name,
        role: role.toUpperCase(),
        phone: phone || "+91 97708 69581",
        city: city || "Indore",
        lat: targetCoords.lat,
        lng: targetCoords.lng,
        isVerified: role === "VOLUNTEER" || role === "DONOR", // NGOs pending admin verification
        karma: 100,
      },
    });

    // Create profile
    if (role === "DONOR") {
      await prisma.donorProfile.create({
        data: {
          userId: newUser.id,
          businessName: businessName || name,
          businessType: businessType || "Restaurant",
          fssaiLicense: fssaiLicense || null,
          address: address || `${city}, India`,
        },
      });
    } else if (role === "VOLUNTEER") {
      await prisma.volunteerProfile.create({
        data: {
          userId: newUser.id,
          vehicleType: vehicleType || "Motorcycle",
          isAvailable: true,
          emergencyRescuer: true,
        },
      });
    } else if (role === "NGO") {
      await prisma.ngoProfile.create({
        data: {
          userId: newUser.id,
          orgName: businessName || name,
          darpanId: darpanId || null,
          registrationNo: registrationNo || null,
          capacityKgPerDay: 200,
          beneficiariesCount: 150,
        },
      });
    }

    const token = signToken({
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role,
      name: newUser.name,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });

    response.cookies.set("rb_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Registration failed" }, { status: 500 });
  }
}

