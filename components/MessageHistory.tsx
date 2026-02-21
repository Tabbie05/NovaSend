"use client";

import { useEffect, useState } from "react";
import { MessageLog } from "@/types";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { Card } from "@/components/Card";

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

  return (
    <Card className="border-white/70 bg-white/90 shadow-[0_18px_50px_rgba(15,23,42,0.08)] hover:translate-y-0 hover:shadow-[0_26px_60px_rgba(15,23,42,0.12)]">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Recent Messages</h3>
        <div className="inline-flex rounded-lg border border-[#E7E1D8] bg-white p-1 dark:border-slate-700 dark:bg-slate-900">
          {(["all", "sent", "failed"] as StatusFilter[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`rounded-md px-2.5 py-1 text-xs transition-colors ${
                statusFilter === tab
                  ? "bg-emerald-50 text-emerald-700 dark:bg-slate-700 dark:text-slate-100"
                  : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {loading ? (
          <>
            <LoadingSkeleton className="h-16 w-full" />
            <LoadingSkeleton className="h-16 w-full" />
            <LoadingSkeleton className="h-16 w-full" />
          </>
        ) : messages.length === 0 ? (
          <div className="rounded-lg border border-dashed border-[#E7E1D8] p-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
            No messages yet.
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg._id} className="rounded-xl border border-[#E7E1D8] bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
              <p className="line-clamp-2 text-sm text-slate-800 dark:text-slate-200">{msg.generatedMessage}</p>
              <div className="mt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>{msg.recipientNumber}</span>
                <span className={msg.status === "sent" ? "text-emerald-600" : "text-rose-600"}>
                  {msg.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>Page {page} of {totalPages}</span>
        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1 || loading}
            className="rounded-lg border border-[#E7E1D8] px-2.5 py-1 disabled:opacity-50 dark:border-slate-700"
          >
            Prev
          </button>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages || loading}
            className="rounded-lg border border-[#E7E1D8] px-2.5 py-1 disabled:opacity-50 dark:border-slate-700"
          >
            Next
          </button>
        </div>
      </div>
    </Card>
  );
}
