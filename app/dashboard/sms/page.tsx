import { MessageComposer } from "@/components/MessageComposer";
import { MessageHistory } from "@/components/MessageHistory";

export const metadata = {
  title: "SMS Inbox — NovaSend",
};

export default function SMSPage() {
  return (
    <div className="p-8 max-w-5xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-nova-500 to-violet-600 text-white shadow-lg shadow-nova-500/25">
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            SMS Inbox
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Generate & send AI-powered SMS campaigns via Twilio
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-8">
        {/* Composer */}
        <div className="nova-card p-6">
          <MessageComposer channel="sms" />
        </div>

        {/* History */}
        <div className="nova-card p-6">
          <MessageHistory channel="sms" />
        </div>
      </div>
    </div>
  );
}
