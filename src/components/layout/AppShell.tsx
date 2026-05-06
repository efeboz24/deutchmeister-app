"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { Notepad } from "./Notepad";

interface AppShellProps {
  header: React.ReactNode;
  children: React.ReactNode;
}

export function AppShell({ header, children }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-navy overflow-hidden">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      <motion.div
        className="flex-1 flex flex-col overflow-hidden min-w-0"
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {header}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </motion.div>
      <Notepad />
    </div>
  );
}
