import { cn } from "@/lib/ui";

interface LoadingSkeletonProps {
  className?: string;
}

export function LoadingSkeleton({ className }: LoadingSkeletonProps) {
  return <div className={cn("animate-pulse rounded-lg bg-slate-100 dark:bg-slate-700", className)} />;
}
