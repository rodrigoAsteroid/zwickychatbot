import { storage } from "@/lib/jsonStorage";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const nodeID = "welcome";
  const lang = searchParams.get("lang") || "es";

  try {
    const node = await storage.getChatNode(nodeID, lang);

    return new Response(JSON.stringify(node), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching node:", error);
    return new Response(JSON.stringify({ message: "Node not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
};
