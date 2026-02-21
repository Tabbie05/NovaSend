"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Card } from "@/components/Card";
import { GenerateMessageForm } from "@/components/GenerateMessageForm";
import { MessageHistory } from "@/components/MessageHistory";

export default function WhatsAppPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="page-enter flex items-center gap-3">
        <span className="rounded-xl border border-[#E7E1D8] bg-emerald-50 p-2 shadow-sm">
          <MessageCircle className="h-5 w-5 text-emerald-600" />
        </span>
        <div>
          <h2 className="font-display text-2xl font-semibold text-slate-900 dark:text-slate-100 sm:text-3xl">WhatsApp Inbox</h2>
          <p className="text-sm text-slate-600">Generate, edit and send WhatsApp campaigns.</p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <Card className="border-white/70 bg-white/90 shadow-[0_20px_60px_rgba(15,23,42,0.08)] hover:translate-y-0 hover:shadow-[0_28px_70px_rgba(15,23,42,0.12)]">
          <GenerateMessageForm channel="whatsapp" onSent={() => setRefreshTrigger((v) => v + 1)} />
        </Card>
        <MessageHistory channel="whatsapp" refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
}
