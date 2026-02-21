import Link from "next/link";
import { getServerSession } from "next-auth";
import { MessageCircle, Send } from "lucide-react";
import { authOptions } from "@/lib/auth";
import { Card } from "@/components/Card";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const firstName = session?.user?.name?.split(" ")[0] || "there";

  const channels = [
    {
      href: "/dashboard/whatsapp",
      title: "WhatsApp Inbox",
      description: "Generate and deliver marketing messages through Twilio WhatsApp Sandbox.",
      icon: MessageCircle,
    },
    {
      href: "/dashboard/sms",
      title: "SMS Inbox",
      description: "Launch short-form SMS campaigns with AI-generated message drafts.",
      icon: Send,
    },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="page-enter">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#E7E1D8] bg-white/90 px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">
          Workspace Overview
        </div>
        <h2 className="mt-4 font-display text-3xl font-semibold text-slate-900 dark:text-slate-100 sm:text-4xl">
          Welcome back, {firstName}
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Pick a channel and start generating conversion-focused messages in minutes.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {channels.map((channel) => {
          const Icon = channel.icon;
          return (
            <Link key={channel.href} href={channel.href}>
              <Card className="h-full border-white/70 bg-white/90 shadow-[0_20px_50px_rgba(15,23,42,0.08)] hover:shadow-[0_28px_70px_rgba(15,23,42,0.12)]">
                <div className="flex items-start gap-3">
                  <span className="rounded-xl border border-[#E7E1D8] bg-emerald-50 p-2 shadow-sm">
                    <Icon className="h-5 w-5 text-emerald-600" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{channel.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{channel.description}</p>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
