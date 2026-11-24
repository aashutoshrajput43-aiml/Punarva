import { NextResponse } from "next/server";
import { analyzeFoodFreshness } from "@/lib/ai";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await analyzeFoodFreshness({
      foodName: body.foodName || "Assorted Cooked Meal",
      category: body.category || "cooked",
      isVeg: body.isVeg ?? true,
      quantityKg: Number(body.quantityKg) || 10,
      cookedAt: body.cookedAt || new Date().toISOString(),
      storageCondition: body.storageCondition || "Ambient",
      holdingTemp: body.holdingTemp !== undefined ? Number(body.holdingTemp) : undefined,
      hoursElapsed: body.hoursElapsed !== undefined ? Number(body.hoursElapsed) : undefined,
      sensoryCondition: body.sensoryCondition,
      allergens: body.allergens,
      notes: body.notes,
      photoBase64: body.photoBase64,
    });

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

