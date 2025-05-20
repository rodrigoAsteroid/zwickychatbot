import { APP_VERSION } from "@/constants/version";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ version: APP_VERSION });
}
