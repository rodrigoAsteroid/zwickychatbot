import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/jsonStorage";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const nodeId = searchParams.get("nodeId");
  const language = searchParams.get("lang") || "es";

  if (!nodeId || typeof nodeId !== "string") {
    return NextResponse.json(
      { message: "Node ID is required" },
      { status: 400 }
    );
  }

  try {
    const node = await storage.getChatNode(nodeId, language);
    return NextResponse.json(node, { status: 200 });
  } catch (error) {
    console.error("Error fetching node:", error);
    return NextResponse.json({ message: "Node not found" }, { status: 404 });
  }
}
