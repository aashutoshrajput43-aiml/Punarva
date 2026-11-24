import { NextResponse } from "next/server";
import { classifyWaste } from "@/lib/ai";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await classifyWaste(body.photoHint, body.textQuery);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

