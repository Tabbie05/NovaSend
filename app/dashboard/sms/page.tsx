"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Card } from "@/components/Card";
import { GenerateMessageForm } from "@/components/GenerateMessageForm";
import { MessageHistory } from "@/components/MessageHistory";

export default function SMSPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="page-enter flex items-center gap-3">
        <span className="rounded-xl border border-[#E7E1D8] bg-orange-50 p-2 shadow-sm">
          <Send className="h-5 w-5 text-orange-500" />
        </span>
        <div>
          <h2 className="font-display text-2xl font-semibold text-slate-900 dark:text-slate-100 sm:text-3xl">SMS Inbox</h2>
          <p className="text-sm text-slate-600">Generate, edit and send SMS campaigns.</p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <Card className="border-white/70 bg-white/90 shadow-[0_20px_60px_rgba(15,23,42,0.08)] hover:translate-y-0 hover:shadow-[0_28px_70px_rgba(15,23,42,0.12)]">
          <GenerateMessageForm channel="sms" onSent={() => setRefreshTrigger((v) => v + 1)} />
        </Card>
        <MessageHistory channel="sms" refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
}
