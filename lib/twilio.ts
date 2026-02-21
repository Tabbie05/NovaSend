import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;

function normalizePhoneE164(value: string): string {
  const trimmed = value.trim().replace(/\s+/g, "");
  if (!trimmed.startsWith("+")) {
    throw new Error("Phone number must include country code (E.164), e.g. +919876543210");
  }
  return trimmed;
}

function normalizeWhatsAppAddress(value: string): string {
  const trimmed = value.trim().replace(/\s+/g, "");
  if (trimmed.startsWith("whatsapp:")) {
    return `whatsapp:${normalizePhoneE164(trimmed.replace(/^whatsapp:/, ""))}`;
  }
  return `whatsapp:${normalizePhoneE164(trimmed)}`;
}

export function getTwilioClient() {
  if (!accountSid || !authToken) {
    throw new Error("Twilio credentials are not configured");
  }
  return twilio(accountSid, authToken);
}

function isTransientNetworkError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return ["ENOTFOUND", "EAI_AGAIN", "ETIMEDOUT", "ECONNRESET"].some((code) =>
    message.includes(code)
  );
}

async function sleep(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function sendWithRetry(
  sendFn: () => Promise<{ sid: string }>,
  attempts = 3
): Promise<{ sid: string }> {
  let lastError: unknown;

  for (let i = 0; i < attempts; i++) {
    try {
      return await sendFn();
    } catch (error) {
      lastError = error;
      const canRetry = i < attempts - 1 && isTransientNetworkError(error);
      if (!canRetry) {
        throw error;
      }
      await sleep(350 * (i + 1));
    }
  }

  throw lastError;
}

export async function sendSMS(to: string, body: string): Promise<string> {
  const client = getTwilioClient();
  const fromRaw = process.env.TWILIO_PHONE_NUMBER!;

  if (!fromRaw) throw new Error("TWILIO_PHONE_NUMBER is not configured");

  const from = normalizePhoneE164(fromRaw);
  const toNumber = normalizePhoneE164(to);

  const message = await sendWithRetry(() =>
    client.messages.create({
      body,
      from,
      to: toNumber,
    })
  );

  return message.sid;
}

export async function sendWhatsApp(to: string, body: string): Promise<string> {
  const client = getTwilioClient();
  const fromRaw = process.env.TWILIO_WHATSAPP_FROM!;

  if (!fromRaw) throw new Error("TWILIO_WHATSAPP_FROM is not configured");

  const fromWhatsApp = normalizeWhatsAppAddress(fromRaw);
  const toWhatsApp = normalizeWhatsAppAddress(to);

  try {
    const message = await sendWithRetry(() =>
      client.messages.create({
        body,
        from: fromWhatsApp,
        to: toWhatsApp,
      })
    );

    return message.sid;
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown Twilio error";
    throw new Error(`${msg}. Using from=${fromWhatsApp}`);
  }
}
