import mongoose, { Document, Schema } from "mongoose";

export type MessageChannel = "sms" | "whatsapp";
export type MessageStatus = "sent" | "failed";
export type MessageTone = "professional" | "friendly" | "urgent";

export interface IMessage extends Document {
  userId: string;
  userEmail: string;
  channel: MessageChannel;
  tone: MessageTone;
  context: string;
  generatedMessage: string;
  recipientNumber: string;
  status: MessageStatus;
  twilioSid?: string;
  errorMessage?: string;
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    userId: { type: String, required: true, index: true },
    userEmail: { type: String, required: true },
    channel: { type: String, enum: ["sms", "whatsapp"], required: true },
    tone: {
      type: String,
      enum: ["professional", "friendly", "urgent"],
      required: true,
    },
    context: { type: String, required: true },
    generatedMessage: { type: String, required: true },
    recipientNumber: { type: String, required: true },
    status: { type: String, enum: ["sent", "failed"], required: true },
    twilioSid: { type: String },
    errorMessage: { type: String },
  },
  {
    timestamps: true,
  }
);

const Message =
  mongoose.models.Message ||
  mongoose.model<IMessage>("Message", MessageSchema);

export default Message;
