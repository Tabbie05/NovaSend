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
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="page-enter">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 sm:text-3xl">Welcome back, {firstName}</h2>
        <p className="mt-2 text-sm text-slate-500">
          Pick a channel and start generating conversion-focused messages in minutes.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {channels.map((channel) => {
          const Icon = channel.icon;
          return (
            <Link key={channel.href} href={channel.href}>
              <Card className="h-full">
                <div className="flex items-start gap-3">
                  <span className="rounded-lg border border-[#EAEAEA] bg-slate-50 p-2 shadow-sm dark:border-slate-700 dark:bg-slate-700">
                    <Icon className="h-5 w-5 text-slate-500" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{channel.title}</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{channel.description}</p>
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
