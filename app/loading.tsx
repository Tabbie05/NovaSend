export default function GlobalLoading() {
  return (
    <div className="app-shell relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <div className="hero-glow" aria-hidden />
      <div className="hero-glow hero-glow--left" aria-hidden />

      <div className="loader-card relative z-10 w-full max-w-sm rounded-3xl border border-[#E7E1D8] bg-white/90 p-6 text-center shadow-[0_24px_60px_rgba(15,23,42,0.14)] backdrop-blur dark:border-slate-700 dark:bg-slate-900/80">
        <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 dark:border-emerald-800/50 dark:bg-emerald-900/20">
          <span className="loader-heart text-2xl text-emerald-600 dark:text-emerald-300" aria-hidden>
            ✦
          </span>
        </div>
        <p className="font-display text-lg font-semibold text-slate-900 dark:text-slate-100">Loading your workspace</p>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Preparing messages, channels, and theme.</p>

        <div className="mt-5 flex items-center justify-center gap-2" aria-label="Loading">
          <span className="loader-dot h-2.5 w-2.5 rounded-full bg-emerald-500" />
          <span className="loader-dot h-2.5 w-2.5 rounded-full bg-orange-400" />
          <span className="loader-dot h-2.5 w-2.5 rounded-full bg-sky-400" />
        </div>
      </div>
    </div>
  );
}

