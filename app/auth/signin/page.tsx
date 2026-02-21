"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { AlertCircle } from "lucide-react";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";

export default function SignInPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [hasAuthError, setHasAuthError] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && session) {
      router.push("/dashboard");
    }
  }, [status, session, router]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setHasAuthError(Boolean(params.get("error")));
    }
  }, []);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-shell relative overflow-hidden">
      <div className="hero-glow" aria-hidden />
      <div className="hero-glow hero-glow--left" aria-hidden />

      <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-4 py-16">
        <Card className="w-full max-w-[420px] border-white/60 bg-white/85 shadow-[0_30px_80px_rgba(15,23,42,0.15)] backdrop-blur hover:translate-y-0">
          <div className="mb-6 space-y-3 text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#E7E1D8] bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-500 text-[11px] font-semibold text-white shadow-sm">
                N
              </span>
              NovaSend
            </div>
            <h1 className="font-display text-2xl font-semibold text-slate-900 sm:text-3xl">Sign in to your workspace</h1>
            <p className="text-sm text-slate-600">Continue with Google to access your dashboard.</p>
          </div>

          {hasAuthError ? (
            <div className="mb-4 flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
              <AlertCircle className="mt-0.5 h-4 w-4" />
              <span>Sign-in failed. Please try again.</span>
            </div>
          ) : null}

          <Button
            variant="primary"
            isLoading={isLoading || status === "loading"}
            onClick={handleGoogleSignIn}
            className="w-full rounded-xl border border-emerald-500 bg-emerald-500 text-white shadow-[0_14px_32px_rgba(16,185,129,0.35)] hover:bg-emerald-600"
          >
            Continue with Google
          </Button>

          <p className="mt-4 text-center text-xs text-slate-500">
            By continuing, you agree to use this workspace for approved campaigns.
          </p>

          <div className="mt-6 text-center">
            <Link href="/" className="text-sm font-semibold text-slate-600 hover:text-slate-900">
              Back to home
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
