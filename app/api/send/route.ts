import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { sendSMS, sendWhatsApp } from "@/lib/twilio";
import { connectDB } from "@/lib/mongodb";
import Message from "@/models/Message";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { to, message, channel, tone, context } = body;

    if (!to || !message || !channel) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: to, message, channel" },
        { status: 400 }
      );
    }

    if (!["whatsapp", "sms"].includes(channel)) {
      return NextResponse.json(
        { success: false, error: "Invalid channel. Use 'whatsapp' or 'sms'." },
        { status: 400 }
      );
    }

    await connectDB();

    let twilioSid: string | undefined;
    let status: "sent" | "failed" = "sent";
    let errorMessage: string | undefined;

    try {
      if (channel === "whatsapp") {
        twilioSid = await sendWhatsApp(to, message);
      } else {
        twilioSid = await sendSMS(to, message);
      }
    } catch (sendError) {
      status = "failed";
      errorMessage = sendError instanceof Error ? sendError.message : "Send failed";
      console.error("[TWILIO SEND ERROR]", sendError);
    }

    // Save message log regardless of send success/failure
    const messageLog = await Message.create({
      userId: session.user.id,
      userEmail: session.user.email,
      channel,
      tone: tone || "professional",
      context: context || "",
      generatedMessage: message,
      recipientNumber: to,
      status,
      twilioSid,
      errorMessage,
    });

    if (status === "failed") {
      return NextResponse.json(
        { success: false, error: errorMessage, logId: messageLog._id },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { twilioSid, logId: messageLog._id },
    });
  } catch (error) {
    console.error("[SEND API ERROR]", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
