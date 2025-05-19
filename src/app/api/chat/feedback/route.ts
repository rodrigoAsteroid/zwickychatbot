import { NextRequest, NextResponse } from 'next/server';
import { storage } from '@/lib/jsonStorage';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nodeId, rating, message } = body;

    if (!nodeId || !rating) {
      return NextResponse.json({ message: 'NodeId and rating are required' }, { status: 400 });
    }

    await storage.saveFeedback(nodeId, rating, message);
    return NextResponse.json({ message: "Feedback saved successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error saving feedback:", error);
    return NextResponse.json({ message: "Failed to save feedback" }, { status: 500 });
  }
}