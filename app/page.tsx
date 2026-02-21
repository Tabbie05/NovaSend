import Link from "next/link";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NovaSend — AI-Powered Marketing Messages",
  description:
    "Generate and send AI-crafted marketing messages via WhatsApp and SMS in seconds.",
};

const features = [
  {
    icon: "✦",
    title: "AI-Powered Copy",
    description:
      "Gemini AI crafts high-converting marketing messages tailored to your brand voice and campaign context.",
    gradient: "from-violet-500 to-purple-600",
    glow: "shadow-violet-500/20",
  },
  {
    icon: "💬",
    title: "WhatsApp Delivery",
    description:
      "Reach customers instantly on the world's most-used messaging platform via Twilio's reliable API.",
    gradient: "from-green-500 to-emerald-600",
    glow: "shadow-green-500/20",
  },
  {
    icon: "📱",
    title: "SMS Campaigns",
    description:
      "98% open rate — SMS still dominates. Send targeted messages directly to any phone number globally.",
    gradient: "from-blue-500 to-cyan-600",
    glow: "shadow-blue-500/20",
  },
  {
    icon: "🎯",
    title: "Tone Control",
    description:
      "Switch between Professional, Friendly, and Urgent tones to match every campaign objective perfectly.",
    gradient: "from-orange-500 to-amber-600",
    glow: "shadow-orange-500/20",
  },
  {
    icon: "📊",
    title: "Message History",
    description:
      "Full audit trail of every message sent — status, delivery time, recipient, and tone, all in one place.",
    gradient: "from-pink-500 to-rose-600",
    glow: "shadow-pink-500/20",
  },
  {
    icon: "🔐",
    title: "Secure Auth",
    description:
      "Google OAuth-powered authentication ensures only your team accesses your campaigns and data.",
    gradient: "from-nova-500 to-indigo-600",
    glow: "shadow-nova-500/20",
  },
];

const stats = [
  { value: "98%", label: "SMS Open Rate" },
  { value: "3s", label: "Avg Generation Time" },
  { value: "2", label: "Channels Supported" },
  { value: "∞", label: "Messages Possible" },
];

const steps = [
  {
    number: "01",
    title: "Sign In",
    description: "One-click Google OAuth. No passwords, no friction.",
  },
  {
    number: "02",
    title: "Describe Your Campaign",
    description: "Tell the AI what your offer is. Any context works.",
  },
  {
    number: "03",
    title: "Pick Tone & Channel",
    description: "Professional, Friendly, or Urgent. WhatsApp or SMS.",
  },
  {
    number: "04",
    title: "Send & Track",
    description: "One click to send. Full history logged automatically.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-hidden">
      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 border-b border-white/5 bg-gray-950/80 backdrop-blur-xl">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-nova-500 to-violet-600 flex items-center justify-center shadow-lg shadow-nova-500/30">
            <span className="text-white text-sm font-bold">N</span>
          </div>
          <span className="font-bold text-lg tracking-tight">
            Nova<span className="text-nova-400">Send</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
          <a href="#stats" className="hover:text-white transition-colors">Stats</a>
        </div>
        <Link
          href="/auth/signin"
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-nova-600 to-violet-600 
                     text-white text-sm font-semibold hover:opacity-90 transition-opacity
                     shadow-lg shadow-nova-500/25"
        >
          Get Started →
        </Link>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center hero-gradient noise overflow-hidden">
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-nova-600/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm text-gray-300 mb-8 animate-fade-up">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Powered by Gemini AI + Twilio
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.05] animate-fade-up" style={{ animationDelay: "100ms" }}>
            Marketing messages
            <br />
            <span className="gradient-text-animate">that actually convert.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up" style={{ animationDelay: "200ms" }}>
            NovaSend generates AI-crafted WhatsApp & SMS campaigns in seconds.
            Pick your tone, edit the copy, hit send — done.
          </p>

          {/* CTAs */}
          <div className="flex items-center justify-center gap-4 flex-wrap animate-fade-up" style={{ animationDelay: "300ms" }}>
            <Link
              href="/auth/signin"
              className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-nova-600 to-violet-600
                         text-white font-bold text-base hover:opacity-90 transition-all duration-200
                         shadow-xl shadow-nova-500/30 glow-pulse flex items-center gap-2"
            >
              Start for free
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <a
              href="#how-it-works"
              className="px-8 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm
                         text-white font-semibold text-base hover:bg-white/10 transition-all duration-200"
            >
              See how it works
            </a>
          </div>

          {/* Hero preview card */}
          <div className="mt-20 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "400ms" }}>
            <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 text-left shadow-2xl">
              {/* Fake window controls */}
              <div className="flex items-center gap-2 mb-5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <div className="ml-3 text-xs text-gray-500 font-mono">novasend.app/dashboard/whatsapp</div>
              </div>
              {/* Fake UI */}
              <div className="space-y-3">
                <div className="h-8 bg-white/10 rounded-lg w-3/4" />
                <div className="flex gap-2">
                  <div className="h-8 flex-1 bg-violet-500/20 rounded-lg border border-violet-500/30" />
                  <div className="h-8 flex-1 bg-white/5 rounded-lg" />
                  <div className="h-8 flex-1 bg-white/5 rounded-lg" />
                </div>
                <div className="h-16 bg-white/5 rounded-lg border border-white/10 p-3">
                  <div className="text-xs text-gray-400 font-mono">
                    ✨ &quot;Don&apos;t miss our 48-hour flash sale — up to 50% off! Shop now before it&apos;s gone 🔥&quot;
                  </div>
                </div>
                <div className="h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <span className="text-xs text-white font-semibold">💬 Send via WhatsApp</span>
                </div>
              </div>
            </div>
            {/* Glow under card */}
            <div className="h-1 mt-0 mx-8 bg-gradient-to-r from-transparent via-nova-500/50 to-transparent blur-sm" />
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-950 to-transparent" />
      </section>

      {/* ── STATS ── */}
      <section id="stats" className="py-20 px-6 border-y border-white/5 bg-gray-900/50">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.value} className="text-center">
              <p className="text-4xl md:text-5xl font-extrabold gradient-text-animate mb-2">
                {stat.value}
              </p>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-28 px-6 relative">
        <div className="absolute inset-0 bg-gradient-radial from-violet-950/20 via-transparent to-transparent" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-nova-400 uppercase tracking-widest mb-4">
              Everything you need
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Built for results,
              <br />
              <span className="text-gray-400">not just demos.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="group relative p-6 rounded-2xl border border-white/8 bg-white/3 
                           hover:bg-white/6 hover:border-white/15 transition-all duration-300
                           hover:-translate-y-1"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl 
                               bg-gradient-to-br ${feature.gradient} ${feature.glow}
                               shadow-lg mb-4 text-xl group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
                {/* Corner accent */}
                <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-28 px-6 bg-gray-900/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-nova-400 uppercase tracking-widest mb-4">
              Simple by design
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              From idea to inbox
              <br />
              <span className="text-gray-400">in 4 steps.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connector line */}
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-nova-500/40 to-transparent" />

            {steps.map((step, i) => (
              <div key={step.number} className="relative text-center group">
                <div
                  className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl
                               border border-white/10 bg-white/5 mb-5 mx-auto
                               group-hover:border-nova-500/50 group-hover:bg-nova-950/30
                               transition-all duration-300"
                >
                  <span className="text-2xl font-black text-gray-600 group-hover:text-nova-400 transition-colors">
                    {step.number}
                  </span>
                  {i < steps.length - 1 && (
                    <div className="lg:hidden absolute -bottom-6 left-1/2 -translate-x-1/2 w-px h-6 bg-white/10" />
                  )}
                </div>
                <h3 className="font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-nova-950 via-violet-950 to-gray-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-nova-600/10 rounded-full blur-3xl" />

        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            Ready to send
            <br />
            <span className="gradient-text-animate">smarter messages?</span>
          </h2>
          <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto">
            Join the future of marketing communications. Sign in with Google and
            start sending in under 60 seconds.
          </p>
          <Link
            href="/auth/signin"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl
                       bg-gradient-to-r from-nova-600 to-violet-600 text-white font-bold text-lg
                       hover:opacity-90 transition-all duration-200 shadow-xl shadow-nova-500/30 glow-pulse"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#fff"
                fillOpacity={0.7}
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#fff"
                fillOpacity={0.7}
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#fff"
                fillOpacity={0.7}
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#fff"
                fillOpacity={0.7}
              />
            </svg>
            Continue with Google
          </Link>
          <p className="mt-4 text-sm text-gray-500">
            No credit card required • Free to get started
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 py-12 px-6 bg-gray-950">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-nova-500 to-violet-600 flex items-center justify-center">
                <span className="text-white text-xs font-bold">N</span>
              </div>
              <span className="font-bold text-base">
                Nova<span className="text-nova-400">Send</span>
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span>Built with Next.js, Gemini AI & Twilio</span>
            </div>
            <p className="text-sm text-gray-600">
              © 2025 NovaSend. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

