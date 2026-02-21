import Link from "next/link";
import { MessageCircle, Sparkles, Send } from "lucide-react";
import { Card } from "@/components/Card";

const features = [
  {
    title: "AI Message Generation",
    description: "Turn campaign context into polished copy using Gemini in a single click.",
    icon: Sparkles,
  },
  {
    title: "WhatsApp Messaging",
    description: "Send campaigns through Twilio WhatsApp Sandbox with full flow control.",
    icon: MessageCircle,
  },
  {
    title: "SMS Campaigns",
    description: "Deliver short, direct SMS campaigns with edit-first message workflows.",
    icon: Send,
  },
];

export default function LandingPage() {
  return (
    <div className="app-shell">
      <header className="border-b border-[#EAEAEA] bg-white dark:border-slate-700 dark:bg-slate-900">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">NovaSend</p>
          <Link href="/auth/signin" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100">
            Sign in
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pt-16">
        <section className="grid items-center gap-10 lg:grid-cols-2">
          <div className="page-enter space-y-6">
            <p className="inline-flex rounded-full border border-[#EAEAEA] bg-white px-3 py-1 text-xs text-slate-500 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
              Unified Inbox for modern teams
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
              AI-Powered Marketing Inbox for WhatsApp & SMS
            </h1>
            <p className="max-w-xl text-base text-slate-500 dark:text-slate-400">
              Create campaign-ready copy, edit before sending, and deliver through Twilio from a single dashboard.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/auth/signin"
                className="inline-flex w-full items-center justify-center rounded-lg border border-sky-500 bg-sky-500 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:scale-[1.02] hover:bg-sky-600 active:scale-[0.98] sm:w-auto"
              >
                Get Started
              </Link>
              <a
                href="#features"
                className="inline-flex w-full items-center justify-center rounded-lg border border-[#EAEAEA] bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-all duration-200 hover:scale-[1.02] hover:bg-slate-50 active:scale-[0.98] sm:w-auto dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                Explore Features
              </a>
            </div>
          </div>

          <Card className="page-enter hover:translate-y-0">
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Dashboard Preview</p>
            <div className="mt-4 space-y-3">
              <div className="rounded-lg border border-[#EAEAEA] bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-700">
                <p className="text-xs text-slate-500 dark:text-slate-300">Campaign Context</p>
                <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">Weekend sale for loyal customers, ending Sunday night.</p>
              </div>
              <div className="rounded-lg border border-[#EAEAEA] bg-white p-3 dark:border-slate-700 dark:bg-slate-800">
                <p className="text-xs text-slate-500 dark:text-slate-300">AI Generated Preview</p>
                <p className="mt-1 text-sm text-slate-800 dark:text-slate-200">
                  Limited-time weekend offer: save up to 40% before Sunday midnight. Shop now.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-2 text-center text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">WhatsApp</div>
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-2 text-center text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">SMS</div>
              </div>
            </div>
          </Card>
        </section>

        <section id="features" className="mt-16 grid gap-4 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title}>
                <span className="inline-flex rounded-lg border border-[#EAEAEA] bg-slate-50 p-2 shadow-sm dark:border-slate-700 dark:bg-slate-700">
                  <Icon className="h-5 w-5 text-slate-500" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-slate-100">{feature.title}</h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{feature.description}</p>
              </Card>
            );
          })}
        </section>

        <section className="mt-16 rounded-xl border border-[#EAEAEA] bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Ready for demo day?</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Sign in and launch your first campaign flow in under five minutes.
          </p>
          <Link href="/auth/signin" className="mt-4 inline-block">
            <span className="inline-flex items-center justify-center rounded-lg border border-rose-500 bg-rose-500 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:scale-[1.02] hover:bg-rose-600 active:scale-[0.98]">
              Launch Dashboard
            </span>
          </Link>
        </section>
      </main>

      <footer className="border-t border-[#EAEAEA] bg-white dark:border-slate-700 dark:bg-slate-900">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 text-xs text-slate-500 dark:text-slate-400 sm:px-6">
          <span>NovaSend</span>
          <span>Built with Next.js, Gemini, Twilio</span>
        </div>
      </footer>
    </div>
  );
}
