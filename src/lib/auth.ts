import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import prisma from "./prisma";

const JWT_SECRET = process.env.NEXTAUTH_SECRET || "rescuebite-production-secret-token-2026";

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
  name: string;
}

export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (err) {
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(plain: string, hashed: string): Promise<boolean> {
  return bcrypt.compare(plain, hashed);
}

export async function getSessionUser() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("rb_token")?.value;
    if (!token) return null;

    const payload = verifyToken(token);
    if (!payload?.userId) return null;

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: {
        donorProfile: true,
        volunteerProfile: true,
        ngoProfile: true,
      },
    });

    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      city: user.city,
      karma: user.karma,
      isVerified: user.isVerified,
      avatar: user.avatar,
      donorProfile: user.donorProfile,
      volunteerProfile: user.volunteerProfile,
      ngoProfile: user.ngoProfile,
    };
  } catch (error) {
    return null;
  }
}

