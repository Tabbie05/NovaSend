"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const errors: Record<string, { title: string; description: string }> = {
    Configuration: {
      title: "Configuration Error",
      description: "There is a problem with the server configuration. Please contact support.",
    },
    AccessDenied: {
      title: "Access Denied",
      description: "You do not have permission to sign in.",
    },
    Verification: {
      title: "Verification Failed",
      description: "The sign in link is no longer valid.",
    },
    Default: {
      title: "Authentication Error",
      description: "An error occurred during authentication. Please try again.",
    },
  };

  const errorInfo = errors[error || "Default"] || errors["Default"];

  return (
    <div className="min-h-screen flex items-center justify-center hero-gradient px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">⚠️</div>
        <h1 className="text-2xl font-bold text-white mb-3">{errorInfo.title}</h1>
        <p className="text-gray-400 mb-8">{errorInfo.description}</p>
        <Link
          href="/auth/signin"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-nova-600 to-violet-600 text-white font-semibold hover:opacity-90 transition-opacity"
        >
          Try Again
        </Link>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-950" />}>
      <ErrorContent />
    </Suspense>
  );
}
