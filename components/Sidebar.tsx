"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Home, MessageCircle, Menu, Send, X, LogOut } from "lucide-react";
import { cn } from "@/lib/ui";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const navItems = [
  { href: "/dashboard", label: "Overview", icon: Home },
  { href: "/dashboard/whatsapp", label: "WhatsApp Inbox", icon: MessageCircle },
  { href: "/dashboard/sms", label: "SMS Inbox", icon: Send },
];

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/", redirect: true });
  };

  return (
    <>
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-[86vw] max-w-72 flex-col border-r border-[#E7E1D8] bg-white/80 p-4 backdrop-blur transition-transform duration-200 dark:border-slate-700 dark:bg-slate-900/80",
          open ? "translate-x-0" : "-translate-x-full",
          "lg:w-72 lg:translate-x-0"
        )}
      >
        <div className="mb-6 flex items-center justify-between px-2">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-500 text-[11px] font-semibold text-white shadow-sm">
              N
            </span>
            <span className="font-display text-sm font-semibold tracking-tight">NovaSend</span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[#E7E1D8] bg-white p-2 text-slate-500 shadow-sm lg:hidden dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const active =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-sm font-medium text-slate-600 transition-all duration-200 dark:text-slate-300",
                  "hover:bg-white hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-100",
                  active && "border-[#E7E1D8] bg-white text-slate-900 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                )}
              >
                <span className={cn("h-5 w-1 rounded-full", active ? "bg-emerald-500" : "bg-transparent")} />
                <Icon className="h-5 w-5 text-slate-500 dark:text-slate-300" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto rounded-2xl border border-[#E7E1D8] bg-white/90 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">{session?.user?.name || "User"}</p>
          <p className="truncate text-xs text-slate-500 dark:text-slate-400">{session?.user?.email}</p>
          <button
            type="button"
            onClick={handleSignOut}
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#E7E1D8] bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            <LogOut className="h-4 w-4 text-slate-500 dark:text-slate-300" />
            Sign out
          </button>
        </div>
      </aside>

      {open ? (
        <button
          type="button"
          aria-label="Close sidebar backdrop"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-slate-900/20 lg:hidden"
        />
      ) : null}
    </>
  );
}

export function SidebarMobileTrigger({ onOpen }: { onOpen: () => void }) {
  return (
      <button
        type="button"
        onClick={onOpen}
        className="rounded-lg border border-[#E7E1D8] bg-white p-2 text-slate-600 shadow-sm lg:hidden dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        aria-label="Open sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>
  );
}
