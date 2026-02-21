"use client";

import { usePathname } from "next/navigation";
import { SidebarMobileTrigger } from "@/components/Sidebar";
import { DarkModeToggle } from "@/components/DarkModeToggle";

const titles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/whatsapp": "WhatsApp Inbox",
  "/dashboard/sms": "SMS Inbox",
};

export function Navbar({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  const pathname = usePathname();
  const title = titles[pathname] ?? "Dashboard";

  return (
    <header className="sticky top-0 z-30 border-b border-[#E7E1D8] bg-white/80 backdrop-blur dark:border-slate-700 dark:bg-slate-950/90">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <SidebarMobileTrigger onOpen={onOpenSidebar} />
          <div>
            <h1 className="font-display text-base font-semibold text-slate-900 dark:text-slate-100 sm:text-lg">{title}</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Unified Inbox workspace</p>
          </div>
        </div>
        <DarkModeToggle />
      </div>
    </header>
  );
}
