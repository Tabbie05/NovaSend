"use client";

import { useState } from "react";
import toast from "react-hot-toast";

type Channel = "whatsapp" | "sms";
type Tone = "professional" | "friendly" | "urgent";

const TEMPLATES: Record<Channel, { label: string; context: string }[]> = {
  whatsapp: [
    {
      label: "🛍️ Flash Sale",
      context:
        "50% off everything in store this weekend only. Electronics, clothing, home goods. Huge discounts.",
    },
    {
      label: "🚀 Product Launch",
      context:
        "Launching our new AI-powered productivity app. Early bird pricing available for first 100 users.",
    },
    {
      label: "🎁 Loyalty Reward",
      context:
        "Exclusive reward for loyal customers. Free gift with any purchase over $50 this week.",
    },
  ],
  sms: [
    {
      label: "⚡ Limited Offer",
      context:
        "Limited-time offer: Buy 2 get 1 free on all items. Ends midnight tonight.",
    },
    {
      label: "📦 Restock Alert",
      context:
        "Your favorite items are back in stock. Limited quantities, first come first served.",
    },
    {
      label: "🎉 Event Invite",
      context:
        "Exclusive customer event this Saturday. Special discounts, giveaways, and live demos.",
    },
  ],
};

const TONE_OPTIONS: { value: Tone; label: string; description: string; color: string }[] = [
  {
    value: "professional",
    label: "Professional",
    description: "Formal & authoritative",
    color: "from-blue-500 to-blue-600",
  },
  {
    value: "friendly",
    label: "Friendly",
    description: "Warm & conversational",
    color: "from-green-500 to-emerald-600",
  },
  {
    value: "urgent",
    label: "Urgent",
    description: "High-impact & time-sensitive",
    color: "from-orange-500 to-red-500",
  },
];

interface MessageComposerProps {
  channel: Channel;
}

export function MessageComposer({ channel }: MessageComposerProps) {
  const [context, setContext] = useState("");
  const [tone, setTone] = useState<Tone>("professional");
  const [generatedMessage, setGeneratedMessage] = useState("");
  const [editedMessage, setEditedMessage] = useState("");
  const [recipientNumber, setRecipientNumber] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const maxChars = channel === "sms" ? 160 : 300;

  const handleTemplateSelect = (templateContext: string) => {
    setContext(templateContext);
    setGeneratedMessage("");
    setEditedMessage("");
  };

  const handleGenerate = async () => {
    if (!context.trim()) {
      toast.error("Please enter some context for your message");
      return;
    }

    setIsGenerating(true);
    const toastId = toast.loading("✨ Generating your message...");

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
      setCharCount(data.data.message.length);
      toast.success("Message generated!", { id: toastId });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Generation failed";
      toast.error(`❌ ${message}`, { id: toastId });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEditMessage = (value: string) => {
    if (value.length <= maxChars) {
      setEditedMessage(value);
      setCharCount(value.length);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(editedMessage);
    toast.success("📋 Copied to clipboard!");
  };

  const handleSend = async () => {
    if (!editedMessage.trim()) {
      toast.error("Please generate a message first");
      return;
    }
    if (!recipientNumber.trim()) {
      toast.error("Please enter a recipient number");
      return;
    }

    setIsSending(true);
    const toastId = toast.loading(
      channel === "whatsapp" ? "📱 Sending via WhatsApp..." : "💬 Sending SMS..."
    );

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
        throw new Error(data.error || "Failed to send message");
      }

      toast.success(
        `✅ ${channel === "whatsapp" ? "WhatsApp" : "SMS"} sent successfully!`,
        { id: toastId }
      );

      // Reset form after successful send
      setContext("");
      setGeneratedMessage("");
      setEditedMessage("");
      setRecipientNumber("");
      setCharCount(0);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Send failed";
      toast.error(`❌ ${message}`, { id: toastId });
    } finally {
      setIsSending(false);
    }
  };

  const isWhatsApp = channel === "whatsapp";
  const accentColor = isWhatsApp ? "from-green-500 to-emerald-600" : "from-nova-500 to-violet-600";
  const channelIcon = isWhatsApp ? "💬" : "📱";
  const channelName = isWhatsApp ? "WhatsApp" : "SMS";

  return (
    <div className="space-y-6">
      {/* Templates */}
      <div>
        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
          Quick Templates
        </p>
        <div className="flex flex-wrap gap-2">
          {TEMPLATES[channel].map((tmpl) => (
            <button
              key={tmpl.label}
              onClick={() => handleTemplateSelect(tmpl.context)}
              className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-white/10
                         bg-white dark:bg-white/5 text-gray-700 dark:text-gray-300
                         hover:border-nova-400 hover:text-nova-600 dark:hover:border-nova-500 dark:hover:text-nova-400
                         transition-all duration-150 hover:shadow-sm"
            >
              {tmpl.label}
            </button>
          ))}
        </div>
      </div>

      {/* Context Input */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          📝 Message Context
        </label>
        <textarea
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder={`Describe your ${channelName} marketing campaign... (e.g., "50% off sale on shoes this weekend, ending Sunday midnight")`}
          rows={3}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10
                     bg-white dark:bg-white/5 text-gray-900 dark:text-white
                     placeholder:text-gray-400 dark:placeholder:text-gray-500
                     focus:outline-none focus:ring-2 focus:ring-nova-500 focus:border-transparent
                     resize-none transition-all duration-150 text-sm"
        />
      </div>

      {/* Tone Selector */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          🎯 Message Tone
        </label>
        <div className="grid grid-cols-3 gap-2">
          {TONE_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => setTone(option.value)}
              className={`relative p-3 rounded-xl border-2 text-left transition-all duration-150
                         ${
                           tone === option.value
                             ? "border-nova-500 bg-nova-50 dark:bg-nova-950/30"
                             : "border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:border-gray-300 dark:hover:border-white/20"
                         }`}
            >
              {tone === option.value && (
                <div
                  className={`absolute top-2 right-2 w-2 h-2 rounded-full bg-gradient-to-r ${option.color}`}
                />
              )}
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {option.label}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {option.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={isGenerating || !context.trim()}
        className={`w-full py-3 px-6 rounded-xl font-semibold text-white text-sm
                   bg-gradient-to-r ${accentColor}
                   hover:opacity-90 active:scale-[0.98]
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all duration-150 flex items-center justify-center gap-2
                   shadow-lg hover:shadow-xl`}
      >
        {isGenerating ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Generating with AI...</span>
          </>
        ) : (
          <>
            <span>✨</span>
            <span>Generate Message</span>
          </>
        )}
      </button>

      {/* Message Preview & Edit */}
      {generatedMessage && (
        <div className="rounded-xl border border-nova-200 dark:border-nova-800/50 bg-nova-50 dark:bg-nova-950/20 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-nova-700 dark:text-nova-300">
              {channelIcon} Generated Message (editable)
            </p>
            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-mono px-2 py-0.5 rounded-full
                           ${charCount > maxChars * 0.9
                             ? "bg-red-100 text-red-600 dark:bg-red-950/30 dark:text-red-400"
                             : "bg-gray-100 text-gray-500 dark:bg-white/10 dark:text-gray-400"
                           }`}
              >
                {charCount}/{maxChars}
              </span>
              <button
                onClick={handleCopy}
                className="text-xs px-2 py-0.5 rounded-lg bg-white dark:bg-white/10 
                           border border-gray-200 dark:border-white/10
                           text-gray-600 dark:text-gray-300 hover:text-nova-600 dark:hover:text-nova-400
                           transition-colors duration-150"
              >
                📋 Copy
              </button>
            </div>
          </div>
          <textarea
            value={editedMessage}
            onChange={(e) => handleEditMessage(e.target.value)}
            rows={4}
            className="w-full bg-white dark:bg-white/5 border border-nova-200 dark:border-nova-700/50
                       text-gray-900 dark:text-white rounded-lg px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-nova-500 resize-none"
          />
          {/* Progress bar */}
          <div className="w-full h-1 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300
                         ${charCount > maxChars * 0.9
                           ? "bg-gradient-to-r from-orange-500 to-red-500"
                           : "bg-gradient-to-r from-nova-500 to-violet-500"
                         }`}
              style={{ width: `${Math.min((charCount / maxChars) * 100, 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Recipient & Send */}
      {generatedMessage && (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              📞 Recipient Number
            </label>
            <input
              type="tel"
              value={recipientNumber}
              onChange={(e) => setRecipientNumber(e.target.value)}
              placeholder={
                isWhatsApp
                  ? "+91XXXXXXXXXX (must join WhatsApp sandbox first)"
                  : "+91XXXXXXXXXX"
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10
                         bg-white dark:bg-white/5 text-gray-900 dark:text-white
                         placeholder:text-gray-400 dark:placeholder:text-gray-500
                         focus:outline-none focus:ring-2 focus:ring-nova-500 focus:border-transparent
                         transition-all duration-150 text-sm"
            />
            {isWhatsApp && (
              <p className="text-xs text-amber-600 dark:text-amber-400 mt-1.5 flex items-center gap-1">
                ⚠️ Recipient must first text &quot;join &lt;your-sandbox-keyword&gt;&quot; to +1 415 523 8886
              </p>
            )}
          </div>

          <button
            onClick={handleSend}
            disabled={isSending || !editedMessage.trim() || !recipientNumber.trim()}
            className={`w-full py-3 px-6 rounded-xl font-semibold text-white text-sm
                       bg-gradient-to-r ${accentColor}
                       hover:opacity-90 active:scale-[0.98]
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-150 flex items-center justify-center gap-2
                       shadow-lg hover:shadow-xl`}
          >
            {isSending ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <span>{channelIcon}</span>
                <span>Send via {channelName}</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
