import { TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/ui";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "w-full rounded-lg border border-[#EAEAEA] bg-white px-3 py-2.5 text-sm text-[#111111] shadow-sm",
        "placeholder:text-slate-400 focus:border-sky-500 focus:outline-none",
        "dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500",
        "resize-none",
        className
      )}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";
