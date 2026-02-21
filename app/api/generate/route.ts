import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { generateMarketingMessage, MessageTone } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { context, tone, channel } = body;

    if (!context || !tone || !channel) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: context, tone, channel" },
        { status: 400 }
      );
    }

    if (!["professional", "friendly", "urgent"].includes(tone)) {
      return NextResponse.json({ success: false, error: "Invalid tone" }, { status: 400 });
    }

    if (!["whatsapp", "sms"].includes(channel)) {
      return NextResponse.json({ success: false, error: "Invalid channel" }, { status: 400 });
    }

    const message = await generateMarketingMessage(context, tone as MessageTone, channel);

    return NextResponse.json({ success: true, data: { message } });
  } catch (error) {
    console.error("[GENERATE API ERROR]", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to generate message";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
