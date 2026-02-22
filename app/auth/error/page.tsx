"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Card } from "@/components/Card";
import { DarkModeToggle } from "@/components/DarkModeToggle";

export default function AuthErrorPage() {
  return (
    <div className="app-shell relative flex min-h-screen items-center justify-center px-4">
      <div className="absolute right-4 top-4 sm:right-6 sm:top-6">
        <DarkModeToggle />
      </div>
      <Card className="w-full max-w-md text-center hover:translate-y-0">
        <div className="mx-auto mb-4 inline-flex rounded-lg border border-rose-200 bg-rose-50 p-2">
          <AlertTriangle className="h-5 w-5 text-rose-600" />
        </div>
        <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Authentication error</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          We could not complete your sign-in request. Please try again.
        </p>
        <Link
          href="/auth/signin"
          className="mt-5 inline-flex rounded-lg border border-[#EAEAEA] bg-white px-4 py-2 text-sm text-slate-700 shadow-sm transition-all duration-200 hover:scale-[1.02] hover:bg-slate-50 active:scale-[0.98] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Go to sign in
        </Link>
      </Card>
    </div>
  );
}
