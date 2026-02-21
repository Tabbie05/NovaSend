"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Card } from "@/components/Card";
import { GenerateMessageForm } from "@/components/GenerateMessageForm";
import { MessageHistory } from "@/components/MessageHistory";

export default function SMSPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="page-enter flex items-center gap-3">
        <span className="rounded-lg border border-[#EAEAEA] bg-white p-2 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <Send className="h-5 w-5 text-slate-500" />
        </span>
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">SMS Inbox</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Generate, edit and send SMS campaigns.</p>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
        <Card className="hover:translate-y-0 hover:shadow-sm">
          <GenerateMessageForm channel="sms" onSent={() => setRefreshTrigger((v) => v + 1)} />
        </Card>
        <MessageHistory channel="sms" refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
}
