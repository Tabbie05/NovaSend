import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

export interface MessageLog {
  _id: string;
  channel: "sms" | "whatsapp";
  tone: "professional" | "friendly" | "urgent";
  context: string;
  generatedMessage: string;
  recipientNumber: string;
  status: "sent" | "failed";
  twilioSid?: string;
  errorMessage?: string;
  createdAt: string;
}

export interface GenerateRequest {
  context: string;
  tone: "professional" | "friendly" | "urgent";
  channel: "whatsapp" | "sms";
}

export interface SendRequest {
  to: string;
  message: string;
  channel: "whatsapp" | "sms";
  tone: "professional" | "friendly" | "urgent";
  context: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
