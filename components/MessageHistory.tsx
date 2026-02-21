"use client";

import { useEffect, useState } from "react";
import { MessageLog } from "@/types";

interface MessageHistoryProps {
  channel: "whatsapp" | "sms";
  refreshTrigger?: number;
}

type StatusFilter = "all" | "sent" | "failed";

interface MessagesApiResponse {
  success: boolean;
  data: MessageLog[];
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export function MessageHistory({ channel, refreshTrigger }: MessageHistoryProps) {
  const [messages, setMessages] = useState<MessageLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        channel,
        limit: "5",
        page: String(page),
      });

      if (statusFilter !== "all") {
        params.set("status", statusFilter);
      }

      const res = await fetch(`/api/messages?${params.toString()}`);
      const data: MessagesApiResponse = await res.json();

      if (data.success) {
        setMessages(data.data);
        setTotalPages(data.meta?.totalPages ?? 1);
        setTotal(data.meta?.total ?? data.data.length);
      }
    } catch (error) {
      console.error("Failed to fetch message history", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [channel, statusFilter]);

  useEffect(() => {
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channel, refreshTrigger, page, statusFilter]);

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

  const statusStyles: Record<"sent" | "failed", string> = {
    sent: "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300",
    failed: "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300",
  };

  const tabs: Array<{ key: StatusFilter; label: string }> = [
    { key: "all", label: "All" },
    { key: "sent", label: "Sent" },
    { key: "failed", label: "Failed" },
  ];

  return (
    <div className="h-[520px] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Recent Messages
        </h3>
        <span className="text-xs text-gray-400 dark:text-gray-500">Total: {total}</span>
      </div>

      <div className="inline-flex p-1 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 mb-3">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setStatusFilter(tab.key)}
            className={`px-3 py-1.5 text-xs rounded-lg font-semibold transition-colors ${
              statusFilter === tab.key
                ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-auto rounded-xl border border-gray-200 dark:border-white/10">
        {loading ? (
          <div className="p-3 space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-12 rounded-lg bg-gray-100 dark:bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-16 text-gray-400 dark:text-gray-500">
            <p className="text-2xl mb-2">{channel === "whatsapp" ? "Message" : "SMS"}</p>
            <p className="text-sm">No messages found</p>
            <p className="text-xs mt-1">Try another filter or send a message</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-gray-50 dark:bg-gray-900/80 backdrop-blur">
              <tr className="border-b border-gray-200 dark:border-white/10 text-left">
                <th className="px-3 py-2 font-semibold text-gray-500 dark:text-gray-400">Message</th>
                <th className="px-3 py-2 font-semibold text-gray-500 dark:text-gray-400">To</th>
                <th className="px-3 py-2 font-semibold text-gray-500 dark:text-gray-400">Tone</th>
                <th className="px-3 py-2 font-semibold text-gray-500 dark:text-gray-400">Status</th>
                <th className="px-3 py-2 font-semibold text-gray-500 dark:text-gray-400">Time</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg._id} className="border-b border-gray-100 dark:border-white/5 align-top">
                  <td className="px-3 py-2 text-gray-800 dark:text-gray-200 max-w-[210px]">
                    <p className="line-clamp-2">{msg.generatedMessage}</p>
                  </td>
                  <td className="px-3 py-2 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    {msg.recipientNumber}
                  </td>
                  <td className="px-3 py-2">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${
                        toneColors[msg.tone] || ""
                      }`}
                    >
                      {msg.tone}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${statusStyles[msg.status]}`}>
                      {msg.status}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-gray-400 dark:text-gray-500 whitespace-nowrap">
                    {formatDate(msg.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="flex items-center justify-between pt-3">
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Page {page} of {totalPages}
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page <= 1 || loading}
            className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Prev
          </button>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page >= totalPages || loading}
            className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
