import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/jsonStorage";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, currentNode, language = "es" } = body;

    // If no current node, return welcome node
    if (!currentNode) {
      const welcomeNode = await storage.getChatNode("welcome", language);
      return NextResponse.json(welcomeNode, { status: 200 });
    }

    // Special command handling
    if (message === "_home") {
      const welcomeNode = await storage.getChatNode("welcome", language);
      return NextResponse.json(welcomeNode, { status: 200 });
    }

    // Get next node based on current node and user input
    const nextNode = await storage.getNextNode(currentNode, message, language);
    return NextResponse.json(nextNode, { status: 200 });
  } catch (error) {
    console.error("Error getting response:", error);
    return NextResponse.json({ message: "Failed to get response" }, { status: 500 });
  }
}
