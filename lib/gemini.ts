import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const LIST_MODELS_URL = "https://generativelanguage.googleapis.com/v1beta/models";
const DEFAULT_MODEL = "gemini-2.5-flash";
const STATIC_FALLBACK_MODELS = [
  "gemini-2.5-flash",
  "gemini-2.0-flash",
  "gemini-1.5-flash",
];
let cachedModels: string[] | null = null;

export type MessageTone = "professional" | "friendly" | "urgent";

const toneDescriptions: Record<MessageTone, string> = {
  professional:
    "formal, polished, business-appropriate tone. Use clear, concise language that conveys authority and trust.",
  friendly:
    "warm, conversational, approachable tone. Use casual language that feels personal and engaging.",
  urgent:
    "compelling, time-sensitive tone. Use action-oriented language with a sense of urgency and limited-time offers.",
};

async function fetchSupportedModelNames(): Promise<string[]> {
  if (cachedModels) return cachedModels;

  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) return [];

  try {
    const res = await fetch(`${LIST_MODELS_URL}?key=${apiKey}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) return [];

    const data = (await res.json()) as {
      models?: Array<{
        name?: string;
        supportedGenerationMethods?: string[];
      }>;
    };

    const models =
      data.models
        ?.filter((m) =>
          (m.supportedGenerationMethods || []).includes("generateContent")
        )
        .map((m) => m.name || "")
        .filter((name) => name.startsWith("models/"))
        .map((name) => name.replace(/^models\//, "")) || [];

    cachedModels = models;
    return models;
  } catch {
    return [];
  }
}

function rankModel(model: string): number {
  if (/gemini-2\.5-flash/i.test(model)) return 100;
  if (/gemini-2\.0-flash/i.test(model)) return 90;
  if (/gemini-1\.5-flash/i.test(model)) return 80;
  if (/flash/i.test(model)) return 70;
  if (/gemini-2\.5-pro/i.test(model)) return 60;
  if (/pro/i.test(model)) return 50;
  if (/gemini/i.test(model)) return 40;
  return 0;
}

export async function generateMarketingMessage(
  context: string,
  tone: MessageTone,
  channel: "whatsapp" | "sms"
): Promise<string> {
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

  const envModel = process.env.GEMINI_MODEL?.trim();
  const discoveredModels = await fetchSupportedModelNames();
  const discoveredSorted = [...discoveredModels].sort(
    (a, b) => rankModel(b) - rankModel(a)
  );
  const modelOrder = [
    ...(envModel ? [envModel] : []),
    DEFAULT_MODEL,
    ...discoveredSorted,
    ...STATIC_FALLBACK_MODELS,
  ].filter((value, index, array) => array.indexOf(value) === index);

  let lastError: unknown;

  for (const modelName of modelOrder) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text().trim();

      // Strip any accidental wrapping quotes
      return text.replace(/^["']|["']$/g, "").trim();
    } catch (error) {
      lastError = error;
    }
  }

  const fallbackMessage =
    lastError instanceof Error ? lastError.message : "Failed to generate message";
  throw new Error(fallbackMessage);
}
