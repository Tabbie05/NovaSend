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
    <div className="app-shell flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-[400px] hover:translate-y-0">
        <div className="mb-6 space-y-2 text-center">
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">NovaSend</p>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Sign in to your workspace</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Continue with Google to access your dashboard.</p>
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
          className="w-full"
        >
          Continue with Google
        </Button>

        <p className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
          By continuing, you agree to use this workspace for approved campaigns.
        </p>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200">
            Back to home
          </Link>
        </div>
      </Card>
    </div>
  );
}
