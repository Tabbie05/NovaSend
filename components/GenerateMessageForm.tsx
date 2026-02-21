"use client";

import { useState } from "react";
import { BadgeCheck, Copy, Sparkles } from "lucide-react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Input } from "@/components/Input";
import { Textarea } from "@/components/Textarea";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { showError, showLoading, showSuccess } from "@/components/Toast";

type Channel = "whatsapp" | "sms";
type Tone = "professional" | "friendly" | "urgent";

const TEMPLATES: Record<Channel, { label: string; context: string }[]> = {
  whatsapp: [
    {
      label: "Flash Sale",
      context:
        "48-hour sale: up to 50% off electronics and accessories. Encourage customers to shop now.",
    },
    {
      label: "Product Launch",
      context:
        "Launching a new AI productivity app with an early adopter offer valid this week.",
    },
    {
      label: "Loyalty Offer",
      context:
        "Offer loyal customers a special reward on orders above $50 for this weekend.",
    },
  ],
  sms: [
    {
      label: "Limited Offer",
      context: "Buy 2 get 1 free on selected products. Campaign ends tonight.",
    },
    {
      label: "Restock Alert",
      context: "Popular products are back in stock. Limited inventory available.",
    },
    {
      label: "Event Invite",
      context:
        "Invite existing customers to an in-store event this Saturday with exclusive deals.",
    },
  ],
};

const toneOptions: { value: Tone; label: string }[] = [
  { value: "professional", label: "Professional" },
  { value: "friendly", label: "Friendly" },
  { value: "urgent", label: "Urgent" },
];

interface GenerateMessageFormProps {
  channel: Channel;
  onSent?: () => void;
}

export function GenerateMessageForm({ channel, onSent }: GenerateMessageFormProps) {
  const [context, setContext] = useState("");
  const [tone, setTone] = useState<Tone>("professional");
  const [generatedMessage, setGeneratedMessage] = useState("");
  const [editedMessage, setEditedMessage] = useState("");
  const [recipientNumber, setRecipientNumber] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const maxChars = channel === "sms" ? 160 : 300;

  const handleGenerate = async () => {
    if (!context.trim()) {
      showError("Please add campaign context.");
      return;
    }

    setIsGenerating(true);
    const toastId = showLoading("Generating message...");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ context: context.trim(), tone, channel }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to generate message");
      }

      setGeneratedMessage(data.data.message);
      setEditedMessage(data.data.message);
      showSuccess("Message generated.", toastId);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Generation failed";
      showError(message, toastId);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSend = async () => {
    if (!editedMessage.trim()) {
      showError("Please generate a message first.");
      return;
    }
    if (!recipientNumber.trim()) {
      showError("Please add a recipient number.");
      return;
    }

    setIsSending(true);
    const toastId = showLoading(channel === "whatsapp" ? "Sending WhatsApp..." : "Sending SMS...");

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: recipientNumber.trim(),
          message: editedMessage.trim(),
          channel,
          tone,
          context,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to send");
      }

      showSuccess("Message sent successfully.", toastId);
      setContext("");
      setGeneratedMessage("");
      setEditedMessage("");
      setRecipientNumber("");
      onSent?.();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Send failed";
      showError(message, toastId);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-slate-900 dark:text-slate-100">Campaign Context</label>
          <span className="text-xs text-slate-500 dark:text-slate-400">{context.length}/{maxChars * 4}</span>
        </div>
        <Textarea
          rows={4}
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="Describe your offer, product, audience, and urgency."
        />
        <div className="flex flex-wrap gap-2">
          {TEMPLATES[channel].map((item) => (
            <button
              key={item.label}
              onClick={() => setContext(item.context)}
              className="rounded-lg border border-[#E7E1D8] bg-white px-3 py-1.5 text-xs text-slate-600 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white active:translate-y-0 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {item.label}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <label className="text-sm font-medium text-slate-900 dark:text-slate-100">Tone</label>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {toneOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setTone(option.value)}
              className={`rounded-lg border px-3 py-2 text-sm transition-all duration-200 ${
                tone === option.value
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300"
                  : "border-[#E7E1D8] bg-white text-slate-700 hover:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </section>

      <Button
        variant="primary"
        isLoading={isGenerating}
        icon={<Sparkles className="h-4 w-4" />}
        onClick={handleGenerate}
        className="w-full sm:w-auto"
      >
        Generate Message
      </Button>

      <hr className="border-[#E7E1D8] dark:border-slate-700" />

      {isGenerating ? (
        <Card className="space-y-3 dark:hover:translate-y-0 dark:hover:shadow-sm">
          <LoadingSkeleton className="h-4 w-32" />
          <LoadingSkeleton className="h-20 w-full" />
          <LoadingSkeleton className="h-10 w-full" />
        </Card>
      ) : null}

      {generatedMessage ? (
        <Card className="space-y-4 border-white/70 bg-white/90 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1 rounded-full border border-[#E7E1D8] bg-emerald-50 px-2 py-1 text-[11px] text-emerald-700">
              <BadgeCheck className="h-3.5 w-3.5" />
              AI Generated
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">{editedMessage.length}/{maxChars}</span>
          </div>
          <Textarea
            rows={5}
            value={editedMessage}
            onChange={(e) => {
              if (e.target.value.length <= maxChars) {
                setEditedMessage(e.target.value);
              }
            }}
          />
          <Button
            variant="ghost"
            onClick={() => {
              navigator.clipboard.writeText(editedMessage);
              showSuccess("Copied.");
            }}
            icon={<Copy className="h-4 w-4 text-slate-500" />}
            className="w-full sm:w-auto"
          >
            Copy Message
          </Button>
        </Card>
      ) : null}

      {generatedMessage ? (
        <section className="space-y-3">
          <label className="text-sm font-medium text-slate-900 dark:text-slate-100">Recipient Number</label>
          <Input
            type="tel"
            value={recipientNumber}
            onChange={(e) => setRecipientNumber(e.target.value)}
            placeholder="+919876543210"
          />
          {channel === "whatsapp" ? (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Recipient must join Twilio WhatsApp sandbox before delivery.
            </p>
          ) : null}
          <Button
            variant="secondary"
            isLoading={isSending}
            onClick={handleSend}
            className="w-full sm:w-auto"
          >
            Send Message
          </Button>
        </section>
      ) : null}
    </div>
  );
}
