import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import { DB_BASE64 } from "./db-base64";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function getDatabaseUrl(): string {
  // If running on Vercel or in container where root filesystem is read-only
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    const tmpDbPath = "/tmp/dev.db";

    try {
      if (!fs.existsSync(tmpDbPath)) {
        // Try to find the file in project root or prisma folder
        const candidates = [
          path.join(process.cwd(), "dev.db"),
          path.join(process.cwd(), "prisma", "dev.db"),
        ];

        let copied = false;
        for (const candidate of candidates) {
          if (fs.existsSync(candidate)) {
            fs.copyFileSync(candidate, tmpDbPath);
            copied = true;
            break;
          }
        }

        // If not found in deployment filesystem, restore from embedded base64 snapshot
        if (!copied && DB_BASE64) {
          fs.writeFileSync(tmpDbPath, Buffer.from(DB_BASE64, "base64"));
        }
      }
    } catch (err) {
      console.error("Error setting up /tmp/dev.db for Vercel:", err);
    }

    return `file:${tmpDbPath}`;
  }

  // Local development
  return process.env.DATABASE_URL || "file:./dev.db";
}

const dbUrl = getDatabaseUrl();

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasourceUrl: dbUrl,
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
