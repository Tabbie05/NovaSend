import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;

export function getTwilioClient() {
  if (!accountSid || !authToken) {
    throw new Error("Twilio credentials are not configured");
  }
  return twilio(accountSid, authToken);
}

export async function sendSMS(to: string, body: string): Promise<string> {
  const client = getTwilioClient();
  const from = process.env.TWILIO_PHONE_NUMBER!;

  if (!from) throw new Error("TWILIO_PHONE_NUMBER is not configured");

  const message = await client.messages.create({
    body,
    from,
    to,
  });

  return message.sid;
}

export async function sendWhatsApp(to: string, body: string): Promise<string> {
  const client = getTwilioClient();
  const from = process.env.TWILIO_WHATSAPP_FROM!;

  if (!from) throw new Error("TWILIO_WHATSAPP_FROM is not configured");

  // Ensure the to number has whatsapp: prefix
  const toWhatsApp = to.startsWith("whatsapp:") ? to : `whatsapp:${to}`;

  const message = await client.messages.create({
    body,
    from,
    to: toWhatsApp,
  });

  return message.sid;
}
