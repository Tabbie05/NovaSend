import { HTMLAttributes } from "react";
import { cn } from "@/lib/ui";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-xl border border-[#EAEAEA] bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800",
        "transition-all duration-200 hover:-translate-y-1 hover:shadow-md",
        className
      )}
      {...props}
    />
  );
}
