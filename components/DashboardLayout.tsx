"use client";

import { ReactNode, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";

export function DashboardLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="app-shell flex min-h-screen">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="min-w-0 flex-1 lg:pl-72">
        <Navbar onOpenSidebar={() => setOpen(true)} />
        <main className="page-enter p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
