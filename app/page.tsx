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
      <header className="relative z-20 border-b border-[#E7E1D8] bg-white/90 backdrop-blur dark:border-slate-700 dark:bg-slate-900">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-500 text-sm font-semibold text-white shadow-sm">
              N
            </span>
            <p className="font-display text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-100">NovaSend</p>
          </div>
          <Link
            href="/auth/signin"
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500 bg-emerald-500 px-4 py-2 text-xs font-semibold text-white shadow-[0_12px_30px_rgba(16,185,129,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-600"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white/80" aria-hidden />
            Sign in
          </Link>
        </div>
      </header>

      <main className="relative mx-auto max-w-6xl px-4 pb-20 pt-14 sm:px-6 sm:pt-20">
        <div className="hero-glow" aria-hidden />
        <div className="hero-glow hero-glow--left" aria-hidden />

        <section className="relative z-10 grid items-center gap-12 lg:grid-cols-2">
          <div className="page-enter space-y-6">
            <p className="inline-flex rounded-full border border-[#E7E1D8] bg-white/90 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
              Unified Inbox for modern teams
            </p>
            <h1 className="font-display text-4xl font-semibold leading-[1.05] text-slate-900 dark:text-slate-100 sm:text-5xl lg:text-6xl">
              AI-Powered Marketing Inbox for WhatsApp & SMS
            </h1>
            <p className="max-w-xl text-base text-slate-600 dark:text-slate-300 sm:text-lg">
              Create campaign-ready copy, edit before sending, and deliver through Twilio from a single dashboard.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/auth/signin"
                className="inline-flex w-full items-center justify-center rounded-xl border border-emerald-500 bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(16,185,129,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-600 active:translate-y-0 sm:w-auto"
              >
                Get Started
              </Link>
              <a
                href="#features"
                className="inline-flex w-full items-center justify-center rounded-xl border border-[#E7E1D8] bg-white/90 px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white sm:w-auto dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                Explore Features
              </a>
            </div>
          </div>

          <Card className="page-enter relative border-white/60 bg-white/85 shadow-[0_24px_70px_rgba(15,23,42,0.15)] backdrop-blur">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Dashboard Preview</p>
            <div className="mt-4 space-y-3">
              <div className="rounded-lg border border-[#E7E1D8] bg-white/80 p-3">
                <p className="text-xs text-slate-500">Campaign Context</p>
                <p className="mt-1 text-sm text-slate-700">Weekend sale for loyal customers, ending Sunday night.</p>
              </div>
              <div className="rounded-lg border border-[#E7E1D8] bg-white p-3">
                <p className="text-xs text-slate-500">AI Generated Preview</p>
                <p className="mt-1 text-sm text-slate-800">
                  Limited-time weekend offer: save up to 40% before Sunday midnight. Shop now.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg border border-[#E7E1D8] bg-white p-2 text-center text-xs text-slate-500">WhatsApp</div>
                <div className="rounded-lg border border-[#E7E1D8] bg-white p-2 text-center text-xs text-slate-500">SMS</div>
              </div>
            </div>
          </Card>
        </section>

        <section id="features" className="relative z-10 mt-20">
          <div className="section-panel p-6 md:p-10">
            <div className="grid gap-4 md:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Card key={feature.title} className="border-transparent bg-white/90 shadow-[0_16px_40px_rgba(15,23,42,0.08)] hover:shadow-[0_22px_50px_rgba(15,23,42,0.12)]">
                    <span className="inline-flex rounded-lg border border-[#E7E1D8] bg-emerald-50 p-2 shadow-sm">
                      <Icon className="h-5 w-5 text-emerald-600" />
                    </span>
                    <h3 className="mt-4 text-base font-semibold text-slate-900">{feature.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{feature.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative z-10 mt-20 rounded-3xl border border-[#E7E1D8] bg-gradient-to-br from-[#ECFDF5] via-white to-[#FFF7ED] p-8 shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
          <h2 className="font-display text-2xl font-semibold text-slate-900 sm:text-3xl">Ready for demo day?</h2>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Sign in and launch your first campaign flow in under five minutes.
          </p>
          <Link href="/auth/signin" className="mt-5 inline-block">
            <span className="inline-flex items-center justify-center rounded-xl border border-orange-400 bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(249,115,22,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-600">
              Launch Dashboard
            </span>
          </Link>
        </section>
      </main>

      <footer className="border-t border-[#E7E1D8] bg-white/90 backdrop-blur dark:border-slate-700 dark:bg-slate-900">
        <div className="mx-auto flex flex-col gap-3 px-4 py-6 text-xs text-slate-500 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-[11px] font-semibold text-white dark:bg-slate-100 dark:text-slate-900">
              N
            </span>
            <span className="font-display text-xs font-semibold text-slate-700 dark:text-slate-200">NovaSend</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="rounded-full border border-[#E7E1D8] bg-white px-3 py-1 text-[11px] text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
              Built with Next.js, Gemini, Twilio
            </span>
            <span className="text-[11px] text-slate-500">© 2026 NovaSend</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
