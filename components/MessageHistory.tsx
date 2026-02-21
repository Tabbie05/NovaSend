"use client";

import { useEffect, useState } from "react";
import { MessageLog } from "@/types";

interface MessageHistoryProps {
  channel: "whatsapp" | "sms";
  refreshTrigger?: number;
}

export function MessageHistory({ channel, refreshTrigger }: MessageHistoryProps) {
  const [messages, setMessages] = useState<MessageLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`/api/messages?channel=${channel}&limit=10`);
      const data = await res.json();
      if (data.success) {
        setMessages(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch message history", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channel, refreshTrigger]);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("en-IN", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const toneColors: Record<string, string> = {
    professional: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300",
    friendly: "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300",
    urgent: "bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-300",
  };

  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
        Recent Messages
      </h3>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-16 rounded-xl bg-gray-100 dark:bg-white/5 animate-pulse"
            />
          ))}
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center py-10 text-gray-400 dark:text-gray-500">
          <p className="text-3xl mb-2">{channel === "whatsapp" ? "💬" : "📱"}</p>
          <p className="text-sm">No messages sent yet</p>
          <p className="text-xs mt-1">Your message history will appear here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className="group p-4 rounded-xl border border-gray-200 dark:border-white/10
                         bg-white dark:bg-white/5 hover:border-nova-300 dark:hover:border-nova-700/50
                         transition-all duration-150"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800 dark:text-gray-200 line-clamp-2">
                    {msg.generatedMessage}
                  </p>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      → {msg.recipientNumber}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${
                        toneColors[msg.tone] || ""
                      }`}
                    >
                      {msg.tone}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {formatDate(msg.createdAt)}
                    </span>
                  </div>
                </div>
                <span
                  className={`shrink-0 text-xs px-2.5 py-1 rounded-full font-semibold
                             ${
                               msg.status === "sent"
                                 ? "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300"
                                 : "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300"
                             }`}
                >
                  {msg.status === "sent" ? "✓ Sent" : "✗ Failed"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
