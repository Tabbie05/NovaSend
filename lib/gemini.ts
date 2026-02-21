import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export type MessageTone = "professional" | "friendly" | "urgent";

const toneDescriptions: Record<MessageTone, string> = {
  professional:
    "formal, polished, business-appropriate tone. Use clear, concise language that conveys authority and trust.",
  friendly:
    "warm, conversational, approachable tone. Use casual language that feels personal and engaging.",
  urgent:
    "compelling, time-sensitive tone. Use action-oriented language with a sense of urgency and limited-time offers.",
};

export async function generateMarketingMessage(
  context: string,
  tone: MessageTone,
  channel: "whatsapp" | "sms"
): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const channelGuidance =
    channel === "sms"
      ? "Keep it under 160 characters if possible. No emojis needed."
      : "Can include 1-2 relevant emojis. Keep it concise but engaging. Under 300 characters.";

  const prompt = `You are an expert marketing copywriter. Generate a single ${channel.toUpperCase()} marketing message with a ${toneDescriptions[tone]}

Context / Product Info:
${context}

Channel: ${channel.toUpperCase()}
${channelGuidance}

Rules:
- Write ONLY the message text, no quotes, no labels, no explanation
- Do NOT include "Message:" or any prefix
- Make it compelling and action-oriented
- Include a clear call-to-action
- Sound human, not robotic

Generate the message now:`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text().trim();

  // Strip any accidental wrapping quotes
  return text.replace(/^["']|["']$/g, "").trim();
}
