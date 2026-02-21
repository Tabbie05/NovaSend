import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Message from "@/models/Message";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const channel = searchParams.get("channel");
    const status = searchParams.get("status");
    const limitRaw = parseInt(searchParams.get("limit") || "20", 10);
    const pageRaw = parseInt(searchParams.get("page") || "1", 10);
    const limit = Number.isNaN(limitRaw) ? 20 : Math.min(Math.max(limitRaw, 1), 50);
    const page = Number.isNaN(pageRaw) ? 1 : Math.max(pageRaw, 1);

    await connectDB();

    const query: Record<string, unknown> = { userId: session.user.id };
    if (channel && ["sms", "whatsapp"].includes(channel)) {
      query.channel = channel;
    }
    if (status && ["sent", "failed"].includes(status)) {
      query.status = status;
    }

    const total = await Message.countDocuments(query);
    const totalPages = Math.max(Math.ceil(total / limit), 1);
    const safePage = Math.min(page, totalPages);
    const skip = (safePage - 1) * limit;

    const messages = await Message.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return NextResponse.json({
      success: true,
      data: messages,
      meta: {
        total,
        page: safePage,
        limit,
        totalPages,
      },
    });
  } catch (error) {
    console.error("[MESSAGES API ERROR]", error);
    return NextResponse.json({ success: false, error: "Failed to fetch messages" }, { status: 500 });
  }
}
