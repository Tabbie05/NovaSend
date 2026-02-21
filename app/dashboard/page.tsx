import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  const channels = [
    {
      href: "/dashboard/whatsapp",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
      title: "WhatsApp",
      description:
        "Generate AI-crafted messages and send via WhatsApp Sandbox. Reach your customers on the world's leading messaging platform.",
      gradient: "from-green-500 to-emerald-600",
      bgLight: "bg-green-50 dark:bg-green-950/20",
      borderLight: "border-green-200 dark:border-green-800/40",
      textColor: "text-green-700 dark:text-green-300",
      stat: "2B+ users",
    },
    {
      href: "/dashboard/sms",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
      title: "SMS",
      description:
        "Send direct SMS campaigns with 98% open rates. Short, punchy, AI-generated messages delivered straight to the inbox.",
      gradient: "from-nova-500 to-violet-600",
      bgLight: "bg-nova-50 dark:bg-nova-950/20",
      borderLight: "border-nova-200 dark:border-nova-800/40",
      textColor: "text-nova-700 dark:text-nova-300",
      stat: "98% open rate",
    },
  ];

  return (
    <div className="p-8 max-w-4xl">
      {/* Header */}
      <div className="mb-10">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
          Welcome back,
        </p>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          {session?.user?.name?.split(" ")[0] ?? "there"} 👋
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Choose a channel to start sending AI-generated marketing messages.
        </p>
      </div>

      {/* Channel cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {channels.map((channel) => (
          <Link
            key={channel.href}
            href={channel.href}
            className="group p-6 rounded-2xl border border-gray-200 dark:border-white/10
                       bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-white/20
                       transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-black/30"
          >
            <div className="flex items-start gap-4">
              <div
                className={`p-3 rounded-xl bg-gradient-to-br ${channel.gradient} text-white
                             shadow-md group-hover:scale-105 transition-transform duration-200 shrink-0`}
              >
                {channel.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {channel.title}
                  </h2>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-semibold ${channel.bgLight} ${channel.textColor} border ${channel.borderLight}`}
                  >
                    {channel.stat}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {channel.description}
                </p>
                <div className="flex items-center gap-1 mt-4 text-sm font-semibold text-gray-900 dark:text-white group-hover:gap-2 transition-all">
                  Open Inbox
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick tip */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-nova-50 to-violet-50 dark:from-nova-950/20 dark:to-violet-950/20 border border-nova-100 dark:border-nova-900/50">
        <div className="flex items-start gap-3">
          <span className="text-2xl mt-0.5">💡</span>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
              Pro tip
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Use the <strong>Urgent</strong> tone for time-limited sales and <strong>Friendly</strong> for loyalty campaigns.
              Gemini AI adapts the message style to match your chosen tone perfectly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
