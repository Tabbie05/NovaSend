"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/ui";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
  icon?: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-emerald-500 text-white border border-emerald-500 hover:bg-emerald-600",
  secondary:
    "bg-rose-500 text-white border border-rose-500 hover:bg-rose-600",
  ghost:
    "bg-white text-slate-700 border border-[#E7E1D8] hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800",
};

export function Button({
  children,
  className,
  variant = "primary",
  isLoading = false,
  disabled,
  icon,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold shadow-sm",
        "transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0",
        "disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100",
        variantClasses[variant],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
      ) : (
        icon
      )}
      <span>{children}</span>
    </button>
  );
}
